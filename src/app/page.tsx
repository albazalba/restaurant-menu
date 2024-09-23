// app/page.tsx
import MenuPage from "@/components/MenuPage";
import { MenuData } from "../types/types";

async function getMenuData(): Promise<MenuData> {
  const res = await fetch(
    "https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1/menu.json"
  );
  if (!res.ok) {
    throw new Error("Failed to fetch menu data");
  }
  return res.json();
}

export default async function Home() {
  const menuData = await getMenuData();
  console.log("🚀 ~ Home ~ menuData:", menuData)
  return (
    <div className="bg-white text-black">
      <MenuPage menuData={menuData} />
    </div>
  );
}
