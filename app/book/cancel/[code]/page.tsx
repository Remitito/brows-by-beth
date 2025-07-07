import { notFound } from "next/navigation";
import { getAppointmentByCode } from "@/actions/getAppointmentByCode";
import CancelClient from "./CancelClient";

interface Props {
  params: {
    code: string;
  };
}

export default async function CancelPageWrapper(props: Props) {
  const params = await props.params;
  const code = params.code;
  const decoded = decodeURIComponent(code);
  const appointment = await getAppointmentByCode(decoded);

  if (!appointment) return notFound();

  return <CancelClient appointment={appointment} code={decoded} />;
}
