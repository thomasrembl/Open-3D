import { getAnalytics } from "@/actions/get-analytics";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DataCard from "./_components/data-card";
import SaleChart from "./_components/sale-chart";

const analyticsPage = async () => {
  const userId = auth().userId;
  if (!userId) {
    return redirect("/login");
  }

  const { data, totalRevenue, totalSale, dataSale } = await getAnalytics(
    userId
  );

  return (
    <div className="p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Ventes Totales" value={totalSale} />
        <DataCard label="Revenue Total" value={totalRevenue} shouldFormat />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 ">
        <SaleChart data={dataSale} type="diagram" />
        <SaleChart data={data} type="bar" />
      </div>
    </div>
  );
};

export default analyticsPage;
