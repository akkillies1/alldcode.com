
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2, Link as LinkIcon, Save, ArrowLeft } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

// Helper to slugify text
const generateSlug = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
};

export const ProjectForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const [inputType, setInputType] = useState<'upload' | 'url'>('upload');

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        video_url: "",
        meta_title: "",
        meta_description: "",
        keywords: "",
        is_published: false,
    });

    useEffect(() => {
        if (id) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    description: data.description || "",
                    video_url: data.video_url || "",
                    meta_title: data.meta_title || "",
                    meta_description: data.meta_description || "",
                    keywords: data.keywords ? data.keywords.join(", ") : "",
                    is_published: data.is_published || false,
                });
                setCoverPreview(data.cover_image_url);
            }
        } catch (error) {
            console.error("Error fetching project:", error);
            toast({
                title: "Error",
                description: "Could not fetch project details",
                variant: "destructive",
            });
            navigate("/admin/projects");
        } finally {
            setFetching(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        // Only auto-generate slug for new projects or if slug is empty
        if (!id && (formData.slug === "" || formData.slug === generateSlug(formData.title))) {
            setFormData({ ...formData, title, slug: generateSlug(title) });
        } else {
            setFormData({ ...formData, title });
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let coverUrl = coverPreview;

            // 1. Upload cover image logic - ONLY if file selected AND input type is upload
            if (coverFile && inputType === 'upload') {
                const fileExt = coverFile.name.split('.').pop();
                const fileName = `cover-${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('project-covers')
                    .upload(filePath, coverFile);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('project-covers')
                    .getPublicUrl(filePath);

                coverUrl = data.publicUrl;
            }
            // Note: If inputType === 'url', coverUrl is already set to the manually entered URL (via coverPreview state)

            // 2. Prepare payload
            const keywordsArray = formData.keywords.split(',').map(k => k.trim()).filter(k => k !== "");

            const payload = {
                title: formData.title,
                slug: formData.slug || generateSlug(formData.title),
                description: formData.description,
                cover_image_url: coverUrl || null,
                video_url: formData.video_url || null,
                meta_title: formData.meta_title || formData.title,
                meta_description: formData.meta_description || null,
                keywords: keywordsArray,
                is_published: formData.is_published,
            };

            let error;
            if (id) {
                const { error: updateError } = await supabase
                    .from('projects')
                    .update(payload)
                    .eq('id', id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('projects')
                    .insert(payload);
                error = insertError;
            }

            if (error) throw error;

            toast({
                title: "Success",
                description: `Project ${id ? "updated" : "created"} successfully`,
            });

            navigate("/admin/projects");

        } catch (error: any) {
            console.error("Error saving project:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to save project",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
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
            <div className="max-w-4xl mx-auto pb-10">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/admin/projects")}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-3xl font-serif font-medium">{id ? "Edit Project" : "New Project"}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate("/admin/projects")}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading} className="min-w-[120px]">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                            {id ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Project Details</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Project Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g. Modern Villa in Cochin"
                                        value={formData.title}
                                        onChange={handleTitleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="slug">URL Slug</Label>
                                    <div className="flex items-center">
                                        <span className="bg-muted px-3 py-2 border border-r-0 rounded-l-md text-sm text-muted-foreground whitespace-nowrap">
                                            dplhomestar.com/mood-board/
                                        </span>
                                        <Input
                                            id="slug"
                                            className="rounded-l-none font-mono text-sm"
                                            placeholder="modern-villa-cochin"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Project Description</Label>
                                    <Textarea
                                        id="description"
                                        rows={8}
                                        placeholder="Tell the story of this project..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">Markdown is supported for formatting.</p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">SEO & Metadata</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="meta_title">Meta Title</Label>
                                    <Input
                                        id="meta_title"
                                        placeholder="SEO Title (defaults to project title)"
                                        value={formData.meta_title}
                                        onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="meta_description">Meta Description</Label>
                                    <Textarea
                                        id="meta_description"
                                        rows={3}
                                        placeholder="Brief summary for search engines (150-160 chars recommended)"
                                        value={formData.meta_description}
                                        onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="keywords">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        placeholder="interior, luxury, kerala, modern (comma separated)"
                                        value={formData.keywords}
                                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Publishing</h2>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label className="text-base">Published Status</Label>
                                    <p className="text-sm text-muted-foreground">Visible to the public</p>
                                </div>
                                <Switch
                                    checked={formData.is_published}
                                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                                />
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Cover Image</h2>
                            <div className="space-y-4">
                                {/* Toggle Input Type */}
                                <div className="flex items-center gap-2 p-1 bg-accent/10 rounded-lg w-fit">
                                    <button
                                        type="button"
                                        onClick={() => setInputType('upload')}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputType === 'upload' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent/20'}`}
                                    >
                                        Upload File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setInputType('url')}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${inputType === 'url' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent/20'}`}
                                    >
                                        Image URL
                                    </button>
                                </div>

                                {inputType === 'upload' ? (
                                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:bg-accent/5 transition-colors relative group">
                                        {coverPreview ? (
                                            <div className="relative">
                                                <img
                                                    src={coverPreview}
                                                    alt="Cover Preview"
                                                    className="w-full h-48 object-cover rounded-md"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onClick={() => {
                                                        setCoverFile(null);
                                                        setCoverPreview(null);
                                                    }}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="py-8 flex flex-col items-center cursor-pointer" onClick={() => document.getElementById('cover-upload')?.click()}>
                                                <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                                                <span className="text-sm text-muted-foreground">Upload Thumbnail</span>
                                            </div>
                                        )}
                                        <Input
                                            id="cover-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleCoverChange}
                                        />
                                    </div>
                                ) : (
                                    <div className="space-y-2 animate-fade-in">
                                        <div className="relative">
                                            <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="https://example.com/image.jpg"
                                                className="pl-9"
                                                value={coverPreview || ''}
                                                onChange={(e) => setCoverPreview(e.target.value)}
                                            />
                                        </div>
                                        {coverPreview && (
                                            <div className="relative mt-2 rounded-lg overflow-hidden border border-border">
                                                <img
                                                    src={coverPreview}
                                                    alt="URL Preview"
                                                    className="w-full h-48 object-cover"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    {inputType === 'upload' ? "This image will be displayed on the main portfolio page card." : "Paste a direct link to an image hosted elsewhere."}
                                </p>
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h2 className="text-lg font-semibold mb-4">Project Video</h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="video_url">Video/Reel URL</Label>
                                    <div className="relative">
                                        <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="video_url"
                                            className="pl-9"
                                            placeholder="https://instagram.com/reel/..."
                                            value={formData.video_url}
                                            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Link to an Instagram Reel or YouTube video for this project.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};
