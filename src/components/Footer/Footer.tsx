
import "./Footer.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getFetchLogo } from "../../store/action/LogoAction";
import { getFetchFooter } from "../../store/action/FooterAction";

export function Footer() {
  const { Footer } = useAppSelector((state: any) => state.Footer);
  const { Logo } = useAppSelector((state: any) => state.Logo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getFetchFooter());
  }, [dispatch]);

  return (
    <section className="globalFooter">
      <div className="footer">
        <div className="containerFooter">
          <div className="imageFooter">
            <img
              src={Logo?.logo ? Logo?.logo : Footer[0]?.logo}
              alt={Footer[0]?.title}
            />
          </div>
          <div className="item">
            <p>{Footer[0]?.text}</p>
          </div>

          
  <div className="socialItem" id="socialItem">
          {Footer?.map((el: any, index: number) => {
            return (
              index > 0 && (
                <div key={index}>
                  <div className="socialLogo" title={el?.title}>
                    <a href={el?.text} target="_black">
                      <img src={el?.logo} alt={el?.title} />
                    </a>
                  </div>
                </div>
              )
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
