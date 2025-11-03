import { useCallback } from "react";
import { Upload } from "lucide-react";
import Papa from "papaparse";
import { TeamData } from "./StandingsTable";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface CSVUploaderProps {
  onDataParsed: (data: TeamData[]) => void;
}

export const CSVUploader = ({ onDataParsed }: CSVUploaderProps) => {
  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
        complete: (results) => {
          try {
            const data = results.data as string[][];
            const headers = data[0];
            const rows = data.slice(1).filter((row) => row.length > 1);

            const parsedData: TeamData[] = rows.map((row) => ({
              rank: parseInt(row[0]) || 0,
              teamName: row[1] || "",
              totalPoints: parseInt(row[2]) || 0,
              placementPoints: parseInt(row[3]) || 0,
              killPoints: parseInt(row[4]) || 0,
              totalKills: parseInt(row[5]) || 0,
              matchesPlayed: parseInt(row[6]) || 0,
              firstPlaceWins: parseInt(row[7]) || 0,
            }));

            onDataParsed(parsedData);
            toast.success("CSV file loaded successfully!");
          } catch (error) {
            console.error("Error parsing CSV:", error);
            toast.error("Failed to parse CSV file");
          }
        },
        error: (error) => {
          console.error("Error reading CSV:", error);
          toast.error("Failed to read CSV file");
        },
      });
    },
    [onDataParsed]
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <label htmlFor="csv-upload">
        <Button variant="default" className="cursor-pointer" asChild>
          <span>
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV File
          </span>
        </Button>
      </label>
      <input
        id="csv-upload"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
