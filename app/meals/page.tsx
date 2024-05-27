import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/component/meals/meal-grid";
import { getMeals } from "@/lib/meals";
import { TMeal } from "@/component/meals/meal-item";
import { Suspense } from "react";

async function Meals() {
  const meals = (await getMeals()) as TMeal[];

  return <MealsGrid meals={meals} />;
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicouse meals, created <span className={classes.highlight}>by you</span>
        </h1>
        <p>Chose recipe</p>
        <h1 className={classes.cta}>
          <Link href="/meals/share">Share recipe</Link>
        </h1>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p className={classes.loading}>Get meals</p>}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}
