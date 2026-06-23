import { permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function TestRedirect({ params: rawParams }: Props) {
  const { slug } = await rawParams;
  permanentRedirect(`/collections/${slug}`);
}
