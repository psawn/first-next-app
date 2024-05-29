import { getMeal } from "@/lib/meals";
import classes from "./page.module.css";
import Image from "next/image";
import { TMeal } from "@/component/meals/meal-item";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

export default function MealDetailsPage({ params }: { params: Params }) {
  const meal = getMeal(params?.mealSlug) as TMeal;

  if (!meal) {
    notFound();
  }

  meal.instructions = meal?.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
