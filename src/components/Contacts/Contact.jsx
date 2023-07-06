import { Link } from "react-router-dom";

import { CURRENTLINE, CYAN, ORANGE, PURPLE, RED } from "../../helpers/colors";

const Contact = ({ contact, deleteContact }) => { // inja ma fun contact ra sakhtim
  // ta faghat on re be valevash yani contansss ersal konim
  return (
    <div className="col-md-6">
      <div style={{ backgroundColor: CURRENTLINE }} className="card my-2">
        <div className="card-body">
          <div className="row align-items-center d-flex justify-content-around">
            
            <div className="col-md-10 col-sm-10">
              <ul className="list-group">
                <li className="list-group-item list-group-item-dark">
                  نام و نام خانوداگی :{"  "}
                  <span className="fw-100">{contact.fullname}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره موبایل :{"  "}
                  <span className="fw-100 fs-">{contact.mobile}</span>
                </li>

                <li className="list-group-item list-group-item-dark">
                  شماره ای پی فون :{"  "}
                  <span className="fw-100">{contact.ipphone}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  شماره داخلی :{"  "}
                  <span className="fw-100">{contact.dakheli}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                شماره ثابت :{"  "}
                  <span className="fw-100">{contact.sabet}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                  اداره مربوطه   :{"  "}
                  <span className="fw-100">{contact.edareh}</span>
                </li>
                <li className="list-group-item list-group-item-dark">
                    سمت :{"  "}
                  <span className="fw-100">{contact.semat}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
              <Link
                to={`/contacts/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: ORANGE }}
              >
                <i className="fa fa-eye" />نمایش
              </Link>

              <Link
                to={`/contacts/edit/${contact.id}`}
                className="btn my-1"
                style={{ backgroundColor: CYAN }}
              >
                <i className="fa fa-pen fw-100" /> ویرایش
              </Link>

              {/* // for delete contact  */}
              {/* <button
                onClick={deleteContact}
                className="btn my-1 fw-100"
                style={{ backgroundColor: RED }}
              >
                <i className="fa fa-trash" />حذف
              </button> */} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
