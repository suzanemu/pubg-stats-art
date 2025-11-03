import { useState, useRef } from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { CSVUploader } from "@/components/CSVUploader";
import { StandingsTable, TeamData } from "@/components/StandingsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import backgroundTexture from "@/assets/background-texture.jpg";

const Index = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [title, setTitle] = useState("TOURNAMENT");
  const [subtitle, setSubtitle] = useState("Season 1");
  const [day, setDay] = useState("OVERALL STANDINGS");
  const standingsRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!standingsRef.current) return;

    try {
      toast.loading("Generating image...");
      const canvas = await html2canvas(standingsRef.current, {
        scale: 2,
        backgroundColor: "#f5f5f5",
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `standings-${Date.now()}.jpg`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success("Image downloaded successfully!");
        }
      }, "image/jpeg", 0.95);
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-secondary mb-2 uppercase tracking-tight">
            PUBG Mobile Standings Generator
          </h1>
          <p className="text-muted-foreground">
            Upload CSV data and generate professional tournament standings
          </p>
        </div>

        <div className="grid lg:grid-cols-[400px,1fr] gap-8 items-start">
          {/* Control Panel */}
          <Card className="p-6 space-y-6 sticky top-8">
            <div>
              <h2 className="text-xl font-bold mb-4 text-secondary">Upload Data</h2>
              <CSVUploader onDataParsed={setTeams} />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-secondary">Customize</h2>
              
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="TOURNAMENT"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Season 1"
                />
              </div>

              <div>
                <Label htmlFor="day">Standings Label</Label>
                <Input
                  id="day"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="OVERALL STANDINGS"
                />
              </div>
            </div>

            {teams.length > 0 && (
              <Button onClick={handleDownload} className="w-full" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download as JPG
              </Button>
            )}
          </Card>

          {/* Preview */}
          <div className="flex flex-col items-center">
            {teams.length > 0 ? (
              <div className="overflow-auto max-w-full">
                <StandingsTable
                  ref={standingsRef}
                  teams={teams}
                  title={title}
                  subtitle={subtitle}
                  day={day}
                />
              </div>
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">Upload a CSV file to get started</p>
                <p className="text-sm mt-2">
                  CSV should include: Rank, Team Name, Total Points, Placement Points, Kill Points, Total Kills, Matches Played, First Place Wins
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
