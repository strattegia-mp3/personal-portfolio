import { baseURL, home } from "@/resources";
import { Meta } from "@once-ui-system/core";
import GeneratorView from "@/views/GeneratorView";

export async function generateMetadata() {
  return Meta.generate({
    title: "OG Generator | Admin",
    description: "Ferramenta interna para geração de capas de projetos.",
    path: "/admin/generator",
    baseURL: baseURL,
    image: home.image,
    noindex: true,
  });
}

export default function AdminGeneratorPage() {
  return <GeneratorView />;
}
