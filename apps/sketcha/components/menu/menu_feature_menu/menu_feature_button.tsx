interface MenuFeatureInterface {
  name: string;
  icon: any;
  onClick?: () => void;
}

export function MenuFeature({name, icon, onClick}: MenuFeatureInterface) {

  return <button className="w-full border-transparent rounded-xl btn btn-primary bg-selectedtool hover:bg-collab" onClick={onClick}>
    {icon} {name}
  </button>
}
