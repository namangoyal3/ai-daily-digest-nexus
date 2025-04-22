
import EmailSubscribe from "./EmailSubscribe";

/**
 * This component uses the main EmailSubscribe component with a full-width background.
 */
export default function NewHomepageSubscribeSection() {
  return (
    <div className="w-full py-0">
      <EmailSubscribe bg={true} />
    </div>
  );
}
