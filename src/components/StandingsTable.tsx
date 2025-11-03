import { forwardRef } from "react";
import { Drumstick } from "lucide-react";
import modernBg from "@/assets/modern-bg.jpg";

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
        className="relative w-[1400px] min-h-[1000px] bg-cover bg-center p-16"
        style={{ 
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%), url(${modernBg})`,
        }}
      >
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <h2 className="text-5xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent uppercase">
                {title}
              </h2>
              <p className="text-lg font-semibold text-gray-400 uppercase tracking-wider">
                {subtitle}
              </p>
            </div>
            <div className="text-right">
              <div className="text-7xl font-black bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent uppercase leading-none">
                {day}
              </div>
            </div>
          </div>
          
          <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full shadow-glow"></div>
        </div>

        {/* Table Container */}
        <div className="space-y-3">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-glow-lg">
            <div className="col-span-1 text-white font-black text-sm uppercase tracking-wider text-center">
              Rank
            </div>
            <div className="col-span-4 text-white font-black text-sm uppercase tracking-wider">
              Team Name
            </div>
            <div className="col-span-2 text-white font-black text-sm uppercase tracking-wider text-center">
              WWCD
            </div>
            <div className="col-span-2 text-white font-black text-sm uppercase tracking-wider text-center">
              Place Pts
            </div>
            <div className="col-span-2 text-white font-black text-sm uppercase tracking-wider text-center">
              Kill Pts
            </div>
            <div className="col-span-1 text-white font-black text-sm uppercase tracking-wider text-center">
              Total
            </div>
          </div>

          {/* Team Rows */}
          {teams.map((team) => {
            const isTopSeven = team.rank <= 7;
            return (
              <div
                key={team.rank}
                className={`grid grid-cols-12 gap-4 px-6 py-5 rounded-xl transition-all duration-200 ${
                  isTopSeven
                    ? "bg-gradient-to-r from-orange-500/20 to-amber-500/10 border-l-4 border-orange-500 shadow-lg"
                    : team.rank % 2 === 0
                    ? "bg-slate-800/50"
                    : "bg-slate-800/30"
                }`}
              >
                {/* Rank */}
                <div className={`col-span-1 flex items-center justify-center ${
                  isTopSeven 
                    ? "text-3xl font-black bg-gradient-to-br from-orange-500 to-amber-500 bg-clip-text text-transparent"
                    : "text-2xl font-bold text-gray-400"
                }`}>
                  {team.rank}
                </div>

                {/* Team Name */}
                <div className={`col-span-4 flex items-center ${
                  isTopSeven
                    ? "text-xl font-bold text-white"
                    : "text-xl font-semibold text-gray-300"
                }`}>
                  {team.teamName}
                </div>

                {/* Wins */}
                <div className="col-span-2 flex items-center justify-center gap-2">
                  {team.firstPlaceWins > 0 && (
                    <>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                        <Drumstick className="text-white" size={14} />
                      </div>
                      <span className="text-lg font-bold text-white">{team.firstPlaceWins}</span>
                    </>
                  )}
                  {team.firstPlaceWins === 0 && (
                    <span className="text-lg font-semibold text-gray-500">-</span>
                  )}
                </div>

                {/* Placement Points */}
                <div className={`col-span-2 flex items-center justify-center text-xl font-bold ${
                  isTopSeven ? "text-orange-400" : "text-gray-300"
                }`}>
                  {team.placementPoints}
                </div>

                {/* Kill Points */}
                <div className={`col-span-2 flex items-center justify-center text-xl font-bold ${
                  isTopSeven ? "text-orange-400" : "text-gray-300"
                }`}>
                  {team.killPoints}
                </div>

                {/* Total Points */}
                <div className={`col-span-1 flex items-center justify-center text-2xl font-black ${
                  isTopSeven
                    ? "bg-gradient-to-br from-orange-500 to-amber-500 bg-clip-text text-transparent"
                    : "text-gray-400"
                }`}>
                  {team.totalPoints}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-700/50 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            PUBG Mobile Tournament Standings
          </p>
        </div>
      </div>
    );
  }
);

StandingsTable.displayName = "StandingsTable";
