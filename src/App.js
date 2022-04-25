import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";

import "./css/App.css";
import "./css/normalize.css";
import Modal from "./components/Modal";
import { fetchUsers, removeUser, setUsers } from "./store/userReducer";
import DataTable from "./components/Table";

export default function App() {
  /* redux tools */
  const dispatch = useDispatch(),
    users = useSelector((state) => state.userReducer.users),
    { enqueueSnackbar } = useSnackbar();

  /* STATES */
  const [ModalActive, setModalActive] = useState(false),
    [ModalRemoveActive, setModalRemoveActive] = useState(false),
    [Fullname, setFullname] = useState(""),
    [Username, setUsername] = useState(""),
    [Email, setEmail] = useState(""),
    [Phone, setPhone] = useState(""),
    [SelectedRow, setSelectedRow] = useState([]);

  /* HANDLERS */
  const handleAddUser = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      name: Fullname,
      username: Username,
      email: Email,
      phone: Phone,
    };
    dispatch(setUsers([user]));
    setModalActive(false);
    enqueueSnackbar("Был добавлен user - " + user.id, { variant: "success" });
  };

  const handleRemoveUser = (user) => {
    dispatch(removeUser(user[0]));
    setModalRemoveActive(false);
    enqueueSnackbar("Был удален user - " + user, { variant: "error" });
  };

  return (
    <div className="wrapper">
      <div className="content">
        <DataTable rows={users} action={setSelectedRow} />
      </div>

      <div className="footer">
        <Button
          variant="outlined"
          color="success"
          onClick={() => setModalActive(true)}
        >
          Добавить
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={(e) =>
            SelectedRow.length === 0
              ? enqueueSnackbar(
                  "Чтобы удалить пользователя, выберите его в списке",
                  { variant: "error" }
                )
              : setModalRemoveActive(true)
          }
        >
          Удалить
        </Button>

        <Button
          variant="outlined"
          onClick={() => {
            dispatch(fetchUsers());
            enqueueSnackbar("Был произведен запрос на 10 пользователей", {
              variant: "success",
            });
          }}
        >
          Test GraphQL
        </Button>
      </div>

      <Modal active={ModalActive}>
        <form className="modal__form" onSubmit={(e) => handleAddUser(e)}>
          <h3>Добавить запись</h3>
          <label htmlFor="name">Full name</label>
          <input
            value={Fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            type="text"
            name="name"
          />
          <label htmlFor="username">Username</label>
          <input
            value={Username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
          />
          <label htmlFor="email">Email</label>
          <input
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
          />
          <label htmlFor="phone">Phone</label>
          <input
            value={Phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            name="phone"
          />

          <Button className="modal__btn" type="submit" color="success">
            Ок
          </Button>
          <Button
            className="modal__btn"
            color="error"
            onClick={() => setModalActive(false)}
          >
            Отмена
          </Button>
        </form>
      </Modal>

      <RemoveModal
        rowState={SelectedRow}
        modalState={ModalRemoveActive}
        setModalState={setModalRemoveActive}
        handler={handleRemoveUser}
      />
    </div>
  );
}

const RemoveModal = ({ rowState, modalState, setModalState, handler }) => {
  return (
    <Modal active={modalState}>
      <p>Удалить?</p>
      <Button type="submit" color="success" onClick={() => handler(rowState)}>
        Да
      </Button>
      <Button color="error" onClick={() => setModalState(false)}>
        Нет
      </Button>
    </Modal>
  );
};
