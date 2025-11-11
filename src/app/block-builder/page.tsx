import { BlockBuilder } from "@/components/block-builder";

export default function BlockBuilderPage() {
  return (
    <div className="flex flex-col items-center">
      <header className="w-full max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Block Builder
        </h1>
        <p className="text-muted-foreground mt-1">
          Let your imagination run wild! Create pixel art, designs, or anything you can think of.
        </p>
      </header>
      <BlockBuilder />
    </div>
  );
}
