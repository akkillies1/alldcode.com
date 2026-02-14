
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Eye, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['projects']['Row'];

export const ProjectList = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast({
                title: "Error",
                description: "Could not fetch projects",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const togglePublishStatus = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('projects')
                .update({ is_published: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setProjects(projects.map(p =>
                p.id === id ? { ...p, is_published: !currentStatus } : p
            ));

            toast({
                title: "Status Updated",
                description: `Project ${!currentStatus ? 'published' : 'unpublished'}`,
            });
        } catch (error) {
            console.error("Error updating status:", error);
            toast({
                title: "Error",
                description: "Could not update status",
                variant: "destructive",
            });
        }
    };

    const deleteProject = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this project? This will unlink all associated images.")) return;

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setProjects(projects.filter(p => p.id !== id));
            toast({
                title: "Project Deleted",
                description: "The project has been permanently removed.",
            });
        } catch (error) {
            console.error("Error deleting project:", error);
            toast({
                title: "Error",
                description: "Could not delete project",
                variant: "destructive",
            });
        }
    };

    if (loading) {
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
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-medium mb-2">Projects</h1>
                    <p className="text-muted-foreground">Manage your portfolio projects</p>
                </div>
                <Button onClick={() => navigate("/admin/projects/new")}>
                    <Plus className="w-4 h-4 mr-2" /> Add Project
                </Button>
            </div>

            <div className="bg-card border rounded-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Cover</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    No projects found. Create your first one!
                                </TableCell>
                            </TableRow>
                        ) : (
                            projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>
                                        <div className="w-12 h-12 rounded overflow-hidden bg-accent/10">
                                            {project.cover_image_url ? (
                                                <img
                                                    src={project.cover_image_url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                                                    No Img
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {project.title}
                                        <div className="text-xs text-muted-foreground mt-1">
                                            Last active: {format(new Date(project.updated_at), 'MMM d, yyyy')}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground font-mono text-xs">
                                        /{project.slug}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={project.is_published}
                                                onCheckedChange={() => togglePublishStatus(project.id, project.is_published)}
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                {project.is_published ? 'Published' : 'Draft'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={`/mood-board/${project.slug}`} target="_blank" rel="noreferrer">
                                                    <Eye className="w-4 h-4 text-muted-foreground" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => navigate(`/admin/projects/${project.id}`)}>
                                                <Edit className="w-4 h-4 text-primary" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => deleteProject(project.id)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
};
