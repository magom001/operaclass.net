import { Link } from "@/i18n";
import { unstable_setRequestLocale } from "next-intl/server";
import { PageParams } from "../layout";

async function getPianists() {
  return [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      city: "Moscow",
      country: "Russia",
      sex: "m",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      city: "Moscow",
      country: "Russia",
      sex: "f",
    },
  ];
}

export default async function Page({ params: { locale } }: PageParams) {
  unstable_setRequestLocale(locale);

  const pianists = await getPianists();

  return (
    <article>
      <ul>
        {pianists.map((p) => (
          <li key={p.id}>
            <Link href={`/pianists/${p.id}`}>
              {p.firstName} {p.lastName}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
