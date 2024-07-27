import bgMobile from "./assets/bg-main-mobile.png";
import bgDesktop from "./assets/bg-main-desktop.png";
import logo from "./assets/card-logo.svg";
import tick from "./assets/icon-complete.svg";
import { useState } from "react";

export default function App() {
	const [confirmed, setConfirmed] = useState<Boolean>(false);
	const [name, setName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cvc, setCvc] = useState("");
	return (
		<>
			<section>
				<div className="absolute">
					<picture>
						<source media="(min-width: 1024px)" srcSet={bgDesktop} />
						<img srcSet={bgMobile} alt="" />
					</picture>
				</div>
				{/* div */}
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2 mx-auto max-w-7xl">
					<div className="mt-32 mx-5 md:grid md:grid-cols-1">
						<article className="front-card p-5 flex flex-col justify-between font-semibold">
							<img className="logo w-12 md:w-20" src={logo} alt="" />
							<div className="text-white">
								<h2 className="text-xl md:text-3xl tracking-widest">
									{cardNumber ? cardNumber : "1234 4567 7885 2342"}
								</h2>
								<ul className="flex items-center md:text-xl justify-between mt-2 md:mt-5 uppercase tracking-wide">
									<li>{name ? name : "YOUR NAME"}</li>
									<li>00/00</li>
								</ul>
							</div>
						</article>
						<article className="back-card md:ml-24 md:-mt-16">
							<p className="absolute right-10 font-semibold text-sm md:right-12 text-white md:text-xl tracking-widest">
								{cvc ? cvc : "123"}
							</p>
						</article>
					</div>
					<div>
						{!confirmed && (
							<form
								className="flex flex-col justify-center gap-6 h-screen max-w-lg"
								action="">
								<div className="">
									<label htmlFor="cardholder_name">Cardholder Name</label>
									<input
										type="text"
										placeholder="Eg. Avikal Darolia"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
								</div>
								<div className="">
									<label htmlFor="card_number">Card Number</label>
									<input
										type="text"
										placeholder="Eg. 1234 5678 9012 3456"
										maxLength={19}
										value={cardNumber}
										onChange={(e) => setCardNumber(e.target.value)}
										required
									/>
								</div>
								<div className="flex items-center justify-between gap-6">
									<div className="flex-1">
										<label htmlFor="expirty_date">Exp. Date(MM/YY)</label>
										<input type="month" placeholder="MM YY" required />
									</div>
									<div className="flex-1">
										<label htmlFor="cvc">CVC</label>
										<input
											type="number"
											placeholder="Eg. 123"
											value={cvc}
											onChange={(e) => setCvc(e.target.value)}
											max={999}
											maxLength={3}
											required
										/>
									</div>
								</div>
								<button
									onClick={() => setConfirmed(true)}
									className="btn w-full"
									type="submit">
									Confirm
								</button>
							</form>
						)}
						{confirmed && <ConfirmationScreen setConfirmed={setConfirmed} />}
					</div>
				</div>
			</section>
		</>
	);
}

function ConfirmationScreen({
	setConfirmed,
}: {
	setConfirmed: (confirmed: boolean) => void;
}) {
	return (
		<>
			<div className="flex flex-col justify-center gap-4 h-screen max-w-lg">
				<img src={tick} alt="" className="block mx-auto" />
				<h1 className="text-slate-600 text-center text-3xl my-6 uppercase">
					Thank you
				</h1>
				<p className="text-slate-400 text-center">
					We've added your card details
				</p>
				<button
					onClick={() => setConfirmed(false)}
					className="btn block mx-auto w-full mt-10">
					Continue
				</button>
			</div>
		</>
	);
}
