import logoUrl from "@/assets/tent-decor-expo-logo.png";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="Tent Decor Expo UP"
      className={className}
      width={380}
      height={200}
      loading="eager"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
      }}
    />
  );
}
