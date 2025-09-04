import { useDispatch } from "react-redux";
import { ReduxPolygon } from "../../redux/map/types";
import cl from "./SideBar.module.scss";
import { setSelectedPolygon } from "../../redux/map/slice";

type Props = {
  mapName: string;
  polygons: ReduxPolygon[];
};

export const SideBar = ({ mapName, polygons }: Props) => {
  const dispatch = useDispatch();

  return (
    <div className={cl.editorPanel}>
      <h2>{mapName}</h2>
      <div className={cl.listTitle}>Map Items</div>
      <div className={cl.itemList}>
        {polygons.map((polygon) => (
          <div
            className={cl.item}
            key={polygon.id}
            onClick={() => dispatch(setSelectedPolygon(polygon))}
          >
            <div className={cl.itemName}>{polygon.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
