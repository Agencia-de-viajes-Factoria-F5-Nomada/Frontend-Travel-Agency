import { DASHBOARD_METRICS, TOP_TRIPS } from "../../constants/mockDashboard";
import DashboardGrid from "../../components/common/DashboardGrid";
import MetricCard from "../../components/cards/MetricCard";
import RankingCard from "../../components/cards/RankingCard";

function DashboardPage() {
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <header className="dashboard__header">
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Visión general de la actividad
          </p>
        </header>

        <DashboardGrid>
          {DASHBOARD_METRICS.map((m) => (
            <MetricCard key={m.id} {...m} />
          ))}
        </DashboardGrid>

        <RankingCard title="Top 3 viajes más rentables" items={TOP_TRIPS} />
      </div>
    </div>
  );
}

export default DashboardPage;
