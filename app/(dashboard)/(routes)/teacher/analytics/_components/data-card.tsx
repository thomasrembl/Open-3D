import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";

interface DataCardProps {
  value: number;
  label: string;
  shouldFormat?: boolean;
}

const DataCard = ({ value, label, shouldFormat }: DataCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>
          <h2 className="text-sm text-cod-gray-950 font-normal font-manrope">
            {label}
          </h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p className="text-2xl font-manrope font-bold">
            {shouldFormat ? formatPrice(value) : value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCard;
