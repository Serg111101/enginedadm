import React, { useEffect, useState } from "react";
import "./UsefulMaterials.scss";
import {
  getFetchLesson,
} from "../../store/action/LessonAction";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function UsefulMaterials() {

  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(false);
  const dispatch = useAppDispatch();
  const { Lesson, loading } = useAppSelector((state) => state.Lesson);
  const Background = Lesson[0]?.background;
  const [count, setCount] = useState(1);
  const [auth,setAuth] = useState<any>(localStorage?.getItem("auth")||{});
  useEffect(()=>{
    if(localStorage?.getItem("auth")){
      let loc:any=localStorage?.getItem("auth")
      setAuth(JSON?.parse(loc))
    }
  },[localStorage?.getItem("auth")])
  useEffect(() => {
    if (auth?.role === "admin") {
      setCount(41000);
    }

  }, [auth]);

  useEffect(() => {
    dispatch(getFetchLesson());
    
  }, [dispatch, auth]);

  async function nextInfo(title:any, index:any) {

    navigate(`/UsefulMaterialsInfo/:${index}`)
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="UsefulMaterials"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="Lesson">
            <div className="prevButton">
              <button onClick={() => navigate("/")}>{Lesson[0]?.button}</button>
            </div>
            {!quiz && (
              <div className="product-grid">
                {Lesson &&
                  Lesson.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                             "product-card"}
                        onClick={() => nextInfo(item?.lesson, index)}
                      >
                        <img
                          className="imageDiv"
                          src={item?.icon}
                          alt={item.lesson}
                        />
                        <div
                          className="color"
                          id="color"
                          style={{ background: item?.color }}
                        >
                          <div className="ikonkaDiv">
                            <img src={item?.ikonka} alt={item.lesson} />
                          </div>
                          <h3>{item?.lesson}</h3>
                          <span>
                            <PlusCircleOutlined />
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

