/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "./api/axios";

const EMAIL_REGEX = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
	const emailRef = useRef();
	const errRef = useRef();

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [passwordFocus, setPasswordFocus] = useState(false);

	const [matchPassword, setMatchPassword] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
	}, [email]);

	useEffect(() => {
		setValidPassword(PASSWORD_REGEX.test(password));
		setValidMatch(password === matchPassword);
	}, [password, matchPassword]);

	useEffect(() => {
		setErrMsg("");
	}, [email, password, matchPassword]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PASSWORD_REGEX.test(password);
		if (!v1 || !v2) {
			setErrMsg("Invalid Entry");
			return;
		}
		try {
			const response = await axios.post("/auth/register", {
				email,
				password,
			});
			console.log(response.data);
			console.log(response);
			setSuccess(true);
			toast.success("Sucessfully Registered!");
		} catch (error) {
			if (!error?.response) {
				toast.error("No server response");
			} else if (error.response?.status === 409) {
				setErrMsg("Email already exist.");
			} else {
				setErrMsg("Registration Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section className="registration">
					<div className="registration_container">
						<a href="/signin">Sign in</a>
					</div>
				</section>
			) : (
				<section className="registration">
					<div className="registration_container">
						<div>
							<h1>Register</h1>
							<p style={{ color: "Gray" }}>
								Welcome, Please fill the form for registration.
							</p>
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
											validEmail || !email
												? "hide"
												: "invalid"
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
								<label htmlFor="password">
									Password:
									<FontAwesomeIcon
										icon={faCheck}
										className={
											validPassword ? "valid" : "hide"
										}
									/>
									<FontAwesomeIcon
										icon={faTimes}
										className={
											validPassword || !password
												? "hide"
												: "invalid"
										}
									/>
								</label>
								<input
									type="password"
									id="password"
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
									required
									aria-invalid={
										validPassword ? "false" : "true"
									}
									aria-describedby="password"
									onFocus={() => setPasswordFocus(true)}
									onBlur={() => setPasswordFocus(false)}
								/>
								<p
									id="password"
									className={
										passwordFocus && !validPassword
											? "instructions"
											: "offscreen"
									}>
									<FontAwesomeIcon icon={faInfoCircle} />
									8 to 24 characters.
									<br />
									Must include uppercase and lowercase
									letters, a number and a special character.
									<br />
									Allowed special characters:{" "}
									<span aria-label="exclamation mark">
										!
									</span>{" "}
									<span aria-label="at symbol">@</span>{" "}
									<span aria-label="hashtag">#</span>{" "}
									<span aria-label="dollar sign">$</span>{" "}
									<span aria-label="percent">%</span>
								</p>
							</div>
							<div className="registratrion_form_input">
								<label htmlFor="confirm_password">
									Confirm Password:
									<FontAwesomeIcon
										icon={faCheck}
										className={
											validMatch && matchPassword
												? "valid"
												: "hide"
										}
									/>
									<FontAwesomeIcon
										icon={faTimes}
										className={
											validMatch || !matchPassword
												? "hide"
												: "invalid"
										}
									/>
								</label>
								<input
									type="password"
									id="confirm_password"
									onChange={(e) =>
										setMatchPassword(e.target.value)
									}
									value={matchPassword}
									required
									aria-invalid={validMatch ? "false" : "true"}
									aria-describedby="confirm"
									onFocus={() => setMatchFocus(true)}
									onBlur={() => setMatchFocus(false)}
								/>
								<p
									id="confirm"
									className={
										matchFocus && !validMatch
											? "instructions"
											: "offscreen"
									}>
									<FontAwesomeIcon icon={faInfoCircle} />
									Must match the first password input field.
								</p>
							</div>
							<button
								type="submit"
								disabled={
									!validEmail || !validPassword || !validMatch
										? true
										: false
								}
								className={
									!validEmail || !validPassword || !validMatch
										? "button_disabled"
										: "button_enabled"
								}>
								Register
							</button>
						</form>
						<p>
							Already registered? &nbsp;
							<span className="line">
								{/*put router link here*/}
								<Link to="/signin"> Sign In</Link>
							</span>
						</p>
					</div>
				</section>
			)}
		</>
	);
};

export default Register;
