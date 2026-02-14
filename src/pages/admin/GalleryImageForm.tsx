import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Link, Image as ImageIcon, Instagram, Facebook } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

export const GalleryImageForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [projects, setProjects] = useState<Project[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
        is_featured: false,
        is_published: true,
        display_order: 0,
        social_media_url: "",
        social_media_source: "",
        alt_text: "",
        project_id: "unassigned", // 'unassigned' or UUID
        media_type: "image", // 'image', 'instagram', 'facebook'
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [inputType, setInputType] = useState<'upload' | 'url'>('upload');

    // ... (rest of state)

    useEffect(() => {
        fetchProjects();
        if (id) {
            fetchImage();
        }
    }, [id]);

    // Correct fetchProjects and useEffect order
    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('id, title').order('created_at', { ascending: false });
        if (data) setProjects(data as Project[]);
    };

    const fetchImage = async () => {

        try {
            const { data, error } = await supabase
                .from('gallery_images')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title,
                    description: data.description || "",
                    tags: data.tags ? data.tags.join(", ") : "",
                    is_featured: data.is_featured || false,
                    is_published: data.is_published || true,
                    display_order: data.display_order || 0,
                    social_media_url: data.social_media_url || "",
                    social_media_source: data.social_media_source || "",
                    alt_text: data.alt_text || "",
                    project_id: data.project_id || "unassigned",
                    media_type: data.media_type || "image",
                });
                setImagePreview(data.image_url);
                // If it's an image, we default to showing the preview. 
                // We keep inputType as 'upload' to show the preview area, but user can switch to URL to edit it.
            }
        } catch (error) {
            console.error("Error fetching image:", error);
            toast({
                title: "Error",
                description: "Could not fetch image details",
                variant: "destructive",
            });
            navigate("/admin/gallery");
        } finally {
            setFetching(false);
        }
    };

    const handleMediaTypeChange = (value: string) => {
        setFormData({ ...formData, media_type: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation: If type is image, we need an image (either new file or existing preview/url)
        if (formData.media_type === 'image' && !imagePreview) {
            toast({
                title: "Error",
                description: "Please select an image or enter a URL",
                variant: "destructive",
            });
            return;
        }

        // Validation: If type is social, we need a URL
        if ((formData.media_type === 'instagram' || formData.media_type === 'facebook') && !formData.social_media_url) {
            toast({
                title: "Error",
                description: "Please provide the Social Media URL",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        try {
            let publicUrl = imagePreview;

            // 1. Upload image to Supabase Storage ONLY if new file selected and type is image AND input mode is upload
            if (imageFile && formData.media_type === 'image' && inputType === 'upload') {
                setUploading(true);
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('gallery-images')
                    .upload(filePath, imageFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('gallery-images')
                    .getPublicUrl(filePath);

                publicUrl = data.publicUrl;
            } else if (formData.media_type !== 'image') {
                // If switching to social, we can optionally clear the image_url or keep it if it existed.
                // For now let's keep it if it's there, but null if we are creating new
                if (!id) publicUrl = null;
            }
            // Note: If inputType === 'url', publicUrl is already set to the value of imagePreview (which is bound to the input)


            // 2. Save record to database
            const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");

            const payload = {
                title: formData.title,
                description: formData.description,
                image_url: publicUrl,
                thumbnail_url: publicUrl,
                tags: tagsArray,
                is_featured: formData.is_featured,
                is_published: formData.is_published,
                display_order: formData.display_order || 0,
                social_media_url: formData.social_media_url || null,
                social_media_source: formData.media_type === 'image' ? formData.social_media_source : formData.media_type,
                alt_text: formData.alt_text || formData.title,
                project_id: formData.project_id === "unassigned" ? null : formData.project_id,
                media_type: formData.media_type,
            };

            let error;
            if (id) {
                const { error: updateError } = await supabase
                    .from('gallery_images')
                    .update(payload)
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('gallery_images')
                    .insert(payload);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: "Success",
                description: `Entry ${id ? "updated" : "created"} successfully`,
            });

            navigate("/admin/gallery");
        } catch (error: any) {
            console.error("Error:", error);
            toast({
                title: "Error",
                description: error.message || "Something went wrong",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            setUploading(false);
        }
    };

    if (fetching) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-serif font-medium">{id ? "Edit Entry" : "Add New Entry"}</h1>
                    <Button variant="outline" onClick={() => navigate("/admin/gallery")}>
                        Cancel
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Main Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <form id="gallery-form" onSubmit={handleSubmit} className="space-y-6">
                                {/* Media Type Selection */}
                                <div className="space-y-4">
                                    <Label>Content Type</Label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-all ${formData.media_type === 'image' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent/50'}`}
                                            onClick={() => handleMediaTypeChange('image')}
                                        >
                                            <ImageIcon className="w-6 h-6" />
                                            <span className="text-sm font-medium">Image Upload</span>
                                        </div>
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-all ${formData.media_type === 'instagram' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent/50'}`}
                                            onClick={() => handleMediaTypeChange('instagram')}
                                        >
                                            <Instagram className="w-6 h-6" />
                                            <span className="text-sm font-medium">Instagram</span>
                                        </div>
                                        <div
                                            className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-all ${formData.media_type === 'facebook' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'hover:bg-accent/50'}`}
                                            onClick={() => handleMediaTypeChange('facebook')}
                                        >
                                            <Facebook className="w-6 h-6" />
                                            <span className="text-sm font-medium">Facebook</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Dynamic Content Input */}
                                {formData.media_type === 'image' ? (
                                    <div className="space-y-2 animate-fade-in">
                                        <Label>Image File</Label>
                                        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-accent/50 transition-colors">
                                            {imagePreview ? (
                                                <div className="relative">
                                                    <img
                                                        src={imagePreview}
                                                        alt="Preview"
                                                        className="max-h-[300px] mx-auto rounded-lg shadow-sm"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2"
                                                        onClick={() => {
                                                            setImageFile(null);
                                                            setImagePreview(null);
                                                        }}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('image-upload')?.click()}>
                                                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                                                    <p className="text-sm text-muted-foreground mb-2">
                                                        Click or Drag to upload
                                                    </p>
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="image-upload"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2 animate-fade-in">
                                        <Label htmlFor="social_media_url">
                                            {formData.media_type === 'instagram' ? 'Instagram Post URL' : 'Facebook Post URL'}
                                        </Label>
                                        <div className="relative">
                                            <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="social_media_url"
                                                className="pl-9"
                                                value={formData.social_media_url}
                                                onChange={(e) => setFormData({ ...formData, social_media_url: e.target.value })}
                                                placeholder={formData.media_type === 'instagram' ? "https://www.instagram.com/p/..." : "https://www.facebook.com/..."}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Paste the full URL to the post. It will be embedded on the site.
                                        </p>
                                    </div>
                                )}

                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g., Modern Living Room"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Brief description..."
                                            rows={3}
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags (comma separated)</Label>
                                        <Input
                                            id="tags"
                                            value={formData.tags}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            placeholder="e.g., Residential, Kitchen, Modern"
                                        />
                                    </div>
                                </div>
                            </form>
                        </Card>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Organization</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Project Assignment</Label>
                                    <Select
                                        value={formData.project_id}
                                        onValueChange={(value) => setFormData({ ...formData, project_id: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a project" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unassigned">Unassigned (Stream)</SelectItem>
                                            {projects.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-muted-foreground">
                                        Link this entry to a specific project album.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Visibility</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="featured">Featured</Label>
                                    <Switch
                                        id="featured"
                                        checked={formData.is_featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="published">Published</Label>
                                    <Switch
                                        id="published"
                                        checked={formData.is_published}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                                    />
                                </div>
                            </div>
                        </Card>

                        <Button type="submit" form="gallery-form" className="w-full" size="lg" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {uploading ? "Uploading..." : "Saving..."}
                                </>
                            ) : (
                                id ? "Update Entry" : "Save Entry"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

