import React, { useEffect, useState } from "react";
import "./UsefulMaterialsInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getFetchLectures,
  getFetchSlides,
} from "../../store/action/LessonAction";
import { Loading } from "../../components/Loading/Loading";

const UsefulMaterialsInfo = () => {
  let LocalValue: any;
if (localStorage.getItem("language")) {
  let local: any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}
  const { Lectures, loading } = useSelector((state:any) => state.Lectures);
  const { Slide } = useSelector((state:any) => state.Slide);
  const [lectures, setLectures] = useState(Lectures);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [elem, setElem] = useState(false);
  const [infoState, setInfoState] = useState(0);
  useEffect(() => {
    let title;
    if (localStorage.getItem("lessons")) {
      const loc:any = localStorage.getItem("lessons");
      title = JSON.parse(loc);
    }
    dispatch<any>(getFetchLectures(title));
    dispatch<any>(getFetchSlides(title));
  }, [dispatch]);

  useEffect(() => {
    if (Lectures?.length > 0) {
      setLectures(Lectures);
    }
  }, [Lectures]);

  const Background = Lectures[0]?.background;
  return (
    <>
      <div
        className="Lecturee"
        style={
          elem ? { display: "none" } : { backgroundImage: `url(${Background})` }
        }
      >
        kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
        {!elem && lectures?.length > 0 && (
          <div className="prevButton">
            <button onClick={() => navigate(`/UsefulMaterials/${LocalValue}`)}>
              {Slide[0]?.button[0]}
            </button>
          </div>
        )}
        <div className={!elem ? "lectureTitle" : ""}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {!elem && lectures?.length > 0 && (
                <>
                  {lectures[0]?.lectures?.map((el:any, index:any) => (
                    <div
                      className="itemLecture"
                      key={index}
                      style={{ background: el.color }}
                    >
                      <p>{el.text}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UsefulMaterialsInfo;
