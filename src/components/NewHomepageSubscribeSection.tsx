
import EmailSubscribe from "./EmailSubscribe";

/**
 * This component uses the main EmailSubscribe component with a full-width background.
 * The new implementation ensures the background spans the entire width.
 */
export default function NewHomepageSubscribeSection() {
  return (
    <section className="w-full bg-neural-gradient py-12">
      <div className="container mx-auto">
        <EmailSubscribe bg={true} containerClassName="w-full" />
      </div>
    </section>
  );
}
