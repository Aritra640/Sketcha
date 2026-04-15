export interface MenuFeatureInterface {
  name: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function MenuFeature({ name, icon, onClick }: MenuFeatureInterface) {
  return (
    <button
      className="w-full flex items-center gap-3 px-4 py-2 rounded-xl btn btn-ghost hover:bg-selectedtool"
      onClick={onClick}
    >
      {/* Icon column (fixed width for alignment) */}
      <div className="w-6 flex justify-center">
        {icon}
      </div>

      {/* Centered text */}
      <div className="flex-1 text-center">
        {name}
      </div>
    </button>
  );
}
