import { useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { ContactContext } from "../../context/contactContext";
import { Spinner } from "../";
import { COMMENT, GREEN, PURPLE } from "../../helpers/colors";
import { contactSchema } from "../../validations/contactValidation";

const AddContact = () => {
  const { loading, groups, createContact } =
    useContext(ContactContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <img
              src={require("../../assets/man-taking-note.png")}
              alt=""
              height="400px"
              style={{
                position: "absolute",
                zIndex: "-1",
                top: "130px",
                left: "100px",
                opacity: "50%",
              }}
            />
            <div className="container">
              <div className="row">
                <div className="col">
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
                    ساخت مخاطب جدید
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: GREEN }} />
              <div className="row mt-5">
                <div className="col-md-4">
                  <Formik
                    initialValues={{
                      fullname: "",
                      mobile: "",
                      ipphone: "",
                      semat: "",
                      edareh: "",
                      sabet: "",
                      dakheli: "",
                      group: "",
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      console.log(values);
                      createContact(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          name="fullname"
                          type="text"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                        />
                        <ErrorMessage
                          name="fullname"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>


                      <div className="mb-2">

                        <Field
                          name="mobile"
                          type="text"
                          className="form-control"
                          placeholder="موبایل "
                        />
                        <ErrorMessage
                          name="mobile"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>

                      <div className="mb-2">

                        <Field
                          name="ipphone"
                          type="text"
                          className="form-control"
                          placeholder="   ای پی فون   "
                        />
                        <ErrorMessage
                          name="ipphone"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>

                      <div className="mb-2">

                        <Field
                          name="dakheli"
                          type="text"
                          className="form-control"
                          placeholder="   داخلی   "
                        />
                        <ErrorMessage
                          name="dakheli"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>

                      <div className="mb-2">

                        <Field
                          name="sabet"
                          type="text"
                          className="form-control"
                          placeholder="  ثایت    "
                        />
                        <ErrorMessage
                          name="sabet"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>


                      <div className="mb-2">

                        <Field
                          name="edareh"
                          type="text"
                          className="form-control"
                          placeholder="  اداره   "
                        />
                        <ErrorMessage
                          name="edareh"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>


                      <div className="mb-2">

                        <Field
                          name="semat"
                          type="text"
                          className="form-control"
                          placeholder="  سمت    "
                        />
                        <ErrorMessage
                          name="semat"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />

                      </div>


                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          className="form-control"
                          placeholder=" انتخاب اداره کل "
                        >
                          <option value="">انتخاب اداره کل</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                         <ErrorMessage
                           name="group"
                           render={(msg) => (
                             <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="درخواست ایجاد مخاطب جدید"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>

                    </Form>
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};



export default AddContact;
