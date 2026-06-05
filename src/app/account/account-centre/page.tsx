import { permanentRedirect } from "next/navigation";

export default function AccountCentrePage() {
  permanentRedirect("/account/account-centre/my-order");
}
