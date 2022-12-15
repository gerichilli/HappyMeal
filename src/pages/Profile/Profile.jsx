import styles from "./Profile.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AiFillIdcard, AiOutlineEdit } from "react-icons/ai";
import { MdEmail, MdVerifiedUser } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import Modal from "../../components/Modal";
import { useState } from "react";
import Input from "../../components/Input";
import { validateAll, validateEmail, validateUserName } from "../../utils/formValidate";
import { deleteAccount, postResetPassword, postUpdateProfileInfo, verifyEmail } from "../../services/authService";
import toast from "react-hot-toast";
import { doLogout, doUserUpdate } from "../../redux/action/userAction";
import Seo from "../../components/Seo";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.account);
  const [isModalProfileShow, setIsModalProfileShow] = useState(false);
  const [isModalDeleteShow, setIsModalDeleteShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [displayProfilePicture, setDisplayProfilePicture] = useState(user.photoUrl);
  const [userName, setUsername] = useState({ value: user.displayName, error: "" });
  const [email, setEmail] = useState({ value: user.email, error: "" });

  function handleChangeProfilePicture(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setDisplayProfilePicture(e.target.result);
      };

      setProfilePicture(file);
    }
  }

  function handleChangeUserName(event) {
    const { message } = validateUserName(event.target.value);
    setUsername({ value: event.target.value, error: message });
  }

  function handleChangeEmail(event) {
    const { message } = validateEmail(event.target.value);
    setEmail({ value: event.target.value, error: message });
  }

  function handleCloseModalProfile() {
    setIsModalProfileShow(false);
    // Reset form
    setEmail({ value: user.email, error: "" });
    setUsername({ value: user.displayName, error: "" });
    setDisplayProfilePicture(user.photoUrl);
    setProfilePicture(null);
  }

  async function handleUpdatePassword() {
    const res = await postResetPassword(user.email);

    if (res && res.data) {
      toast.success(res.data);
    }
  }

  async function handleVerifyEmail() {
    const res = await verifyEmail();

    if (res && res.data) {
      toast.success(res.data, { duration: 4000 });
    }
  }

  async function handleSubmitUserProfile() {
    let validated = validateAll(validateUserName(userName.value), validateEmail(email.value));
    if (validated) {
      const waitting = toast.loading("Updating...");
      const res = await postUpdateProfileInfo(userName.value, email.value, profilePicture);
      toast.dismiss(waitting);

      if (res && res.data) {
        toast.success("Profile updated.");
        dispatch(doUserUpdate(res.data));
        setIsModalProfileShow(false);
      } else {
        toast.error(res);
      }
    }
  }

  async function handleDeleteAccount() {
    const res = await deleteAccount();

    if (res && res.data) {
      toast.success("Account deleted.");
      dispatch(doLogout());
    }
  }

  return (
    <>
      <Seo title="Profile" />
      <div className={styles.wrapper}>
        <div className={styles.profile}>
          <div className={styles.header}>
            <div className={styles.avartar}>{user.photoUrl && <img src={user.photoUrl} alt="Avartar" />}</div>
            <button className={styles.editBtn} onClick={() => setIsModalProfileShow(true)}>
              <AiOutlineEdit />
            </button>
          </div>
          <dl className={styles.info}>
            <div className={styles.block}>
              <dt className={styles.infoTitle}>Display Name</dt>
              <dd className={styles.infoTxt}>{user.displayName || "Member"}</dd>
            </div>
            <div className={styles.block}>
              <dt className={styles.infoTitle}>Email Address</dt>
              <dd className={styles.infoTxt}>
                {user.email}
                <span className={styles.verify}>
                  {user.emailVerified ? <MdVerifiedUser aria-label="Verified" /> : <button onClick={handleVerifyEmail}>Verify Email</button>}
                </span>
              </dd>
            </div>
          </dl>
          <div className={styles.block}>
            <button className={styles.changeBtn} onClick={handleUpdatePassword}>
              Change password
            </button>
          </div>
          <div className={styles.block}>
            <button className={styles.deleteAccountBtn} onClick={() => setIsModalDeleteShow(true)}>
              Delete your account
            </button>
          </div>
        </div>
        <Modal
          isShow={isModalProfileShow}
          handleClose={handleCloseModalProfile}
          handleCancel={handleCloseModalProfile}
          handleConfirm={handleSubmitUserProfile}
        >
          <div className={styles.fileUpload}>
            <div className={styles.avartar}>{displayProfilePicture && <img src={displayProfilePicture} alt="Profile" />}</div>
            <label>
              <BiImageAdd />
              <span>Upload image</span>
              <input type="file" accept="image/*" onChange={handleChangeProfilePicture} className="sr-only" />
            </label>
          </div>
          <Input
            icon={<AiFillIdcard />}
            label="Username"
            type="text"
            placeholder="Username"
            value={userName.value}
            handleChangeValue={handleChangeUserName}
            error={userName.error}
          />
          <Input
            icon={<MdEmail />}
            label="Username"
            type="email"
            placeholder="Email"
            value={email.value}
            handleChangeValue={handleChangeEmail}
            error={email.error}
            readOnly={user.emailVerified}
          />
        </Modal>
        <Modal
          isShow={isModalDeleteShow}
          handleClose={() => setIsModalDeleteShow(false)}
          handleCancel={() => setIsModalDeleteShow(false)}
          handleConfirm={handleDeleteAccount}
        >
          <p className={styles.deleteTxt}>
            Are you sure to delete your account permanently? <br />
            This action cannot be reversed.
          </p>
        </Modal>
      </div>
    </>
  );
}

export default Profile;
