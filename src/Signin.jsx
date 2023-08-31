import { useEffect, useState, useRef, useContext } from "react";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "./api/axios";
import { Link, useNavigate } from "react-router-dom";
import { UserDataProvider } from "./ContextAPI/userDataProvider";

const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

const Signin = () => {
	const userContextData = useContext(UserDataProvider);

	const emailRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");

	const [errMsg, setErrMsg] = useState("");

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setErrMsg("");
	}, [email, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const v1 = EMAIL_REGEX.test(email);
		if (!v1 || password.length === 0) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post("/auth/sign-in", {
				email,
				password,
			});
			userContextData.setUserGeneralInfo({
				user: response.data.email,
				role: response.data.role
			})
			userContextData.setAccessToken({
				accessToken: response.data.email,
			});
			console.log(response.data);
			console.log(response);
			navigate("/home");
			toast.success("Sucessfully Registered!");
		} catch (error) {
			toast.error("Incorrect credential");
			errRef.current.focus();
		}
	};

	return (
		<section className="registration">
			<div className="registration_container">
				<div>
					<h1>Sign In</h1>
					<p style={{ color: "Gray" }}>Welcome back.</p>
				</div>
				<p
					ref={errRef}
					className={errMsg ? "errmsg" : "offscreen"}
					aria-live="assertive">
					{errMsg}
				</p>
				<form onSubmit={handleSubmit}>
					<div className="registratrion_form_input">
						<label htmlFor="email">
							Email:
							<FontAwesomeIcon
								icon={faCheck}
								className={validEmail ? "valid" : "hide"}
							/>
							<FontAwesomeIcon
								icon={faTimes}
								className={
									validEmail || !email ? "hide" : "invalid"
								}
							/>
						</label>
						<input
							type="text"
							id="email"
							ref={emailRef}
							autoComplete="off"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							aria-invalid={validEmail ? "false" : "true"}
							aria-describedby="uidnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>
						<p
							id="uidnote"
							className={
								emailFocus && email && !validEmail
									? "instructions"
									: "offscreen"
							}>
							<FontAwesomeIcon icon={faInfoCircle} />
							Enter a valid email address
						</p>
					</div>
					<div className="registratrion_form_input">
						<label htmlFor="password">Password: </label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							aria-describedby="password"
						/>
					</div>
					<button
						type="submit"
						disabled={
							validEmail && password.length > 0 ? false : true
						}
						className={
							validEmail && password.length > 0
								? "button_enabled"
								: "button_disabled"
						}>
						Sign In
					</button>
				</form>
				<p>
					Do not have account? &nbsp;
					<span className="line">
						{/*put router link here*/}
						<Link to="/register"> Register now</Link>
					</span>
				</p>
			</div>
		</section>
	);
};

export default Signin;
