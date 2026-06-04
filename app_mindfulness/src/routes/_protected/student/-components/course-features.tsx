import { BookOpen, FileText, Video, Award, Headphones, CheckSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CourseWithModules } from "types/student-course";

interface Props {
  course: CourseWithModules;
}

export function CourseFeatures({ course }: Props) {
  const features = [
    {
      icon: BookOpen,
      label: `${course.modules.length} module${course.modules.length > 1 ? "s" : ""} structuré${course.modules.length > 1 ? "s" : ""}`,
    },
    { icon: Video, label: "Vidéos explicatives" },
    { icon: FileText, label: "PDF leçons et supports" },
    { icon: Headphones, label: "Méditations guidées" },
    { icon: CheckSquare, label: "Quiz de validation" },
    { icon: Award, label: "Certification finale" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Ce que contient la formation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {features.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground"
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              {label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
