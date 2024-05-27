import Link from "next/link";
import Image from "next/image";
import classes from "./meal-item.module.css";

export type TMeal = {
  id: string;
  title: string;
  slug: string;
  image: string;
  summary: string;
  creator: string;
};

export default function MealItem({
  title,
  slug,
  image,
  summary,
  creator,
}: TMeal) {
  console.log(image);

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image src={image} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
