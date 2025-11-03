import { forwardRef } from "react";

export interface TeamData {
  rank: number;
  teamName: string;
  totalPoints: number;
  placementPoints: number;
  killPoints: number;
  totalKills: number;
  matchesPlayed: number;
  firstPlaceWins: number;
}

interface StandingsTableProps {
  teams: TeamData[];
  title: string;
  subtitle: string;
  day: string;
}

export const StandingsTable = forwardRef<HTMLDivElement, StandingsTableProps>(
  ({ teams, title, subtitle, day }, ref) => {
    return (
      <div
        ref={ref}
        className="relative w-[1200px] h-auto bg-cover bg-center p-12"
        style={{ backgroundImage: `url('/src/assets/background-texture.jpg')` }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black tracking-wider text-secondary uppercase">
                {title}
              </h2>
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                {subtitle}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-accent text-5xl font-black uppercase tracking-tight">
                  {day.split(" ")[0]}
                </span>
              </div>
              <div className="text-center">
                <span className="text-secondary text-6xl font-black uppercase">
                  {day.split(" ")[1] || ""}
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-b-4 border-accent mb-6"></div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          <div className="bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            #
          </div>
          <div className="col-span-2 bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            Team Name
          </div>
          <div className="bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            Wins
          </div>
          <div className="bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            Place Pts.
          </div>
          <div className="bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            Kills Pts.
          </div>
          <div className="bg-accent text-accent-foreground font-black text-center py-3 px-2 skew-x-[-2deg] text-sm uppercase">
            Total Pts.
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-1">
          {teams.map((team, index) => {
            const isTopSeven = team.rank <= 7;
            return (
              <div
                key={index}
                className={`grid grid-cols-7 gap-2 ${
                  isTopSeven 
                    ? "bg-gradient-to-r from-accent/20 to-accent/10 border-l-4 border-accent" 
                    : index % 2 === 0 
                    ? "bg-[hsl(var(--table-row-dark))]" 
                    : "bg-[hsl(var(--table-row-light))]"
                }`}
              >
                <div className={`font-black text-center py-4 px-2 flex items-center justify-center text-lg ${
                  isTopSeven ? "text-accent" : "text-accent-foreground"
                }`}>
                  {team.rank}
                </div>
                <div className={`col-span-2 font-bold py-4 px-4 flex items-center text-base uppercase tracking-wide ${
                  isTopSeven ? "text-accent" : "text-white"
                }`}>
                  {team.teamName}
                </div>
                <div className="text-white font-bold text-center py-4 px-2 flex items-center justify-center">
                  <span className="text-accent text-xl">✓</span>
                  <span className="ml-2">{team.firstPlaceWins}</span>
                </div>
                <div className={`font-bold text-center py-4 px-2 flex items-center justify-center text-lg ${
                  isTopSeven ? "text-accent" : "text-white"
                }`}>
                  {team.placementPoints}
                </div>
                <div className={`font-bold text-center py-4 px-2 flex items-center justify-center text-lg ${
                  isTopSeven ? "text-accent" : "text-white"
                }`}>
                  {team.killPoints}
                </div>
                <div className="text-accent font-black text-center py-4 px-2 flex items-center justify-center text-xl">
                  {team.totalPoints}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-muted flex items-center justify-center gap-8">
          <div className="text-secondary font-bold text-sm uppercase tracking-wider">
            PUBG Mobile Tournament
          </div>
        </div>
      </div>
    );
  }
);

StandingsTable.displayName = "StandingsTable";
