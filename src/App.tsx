import React, { useState } from "react";
import bgMobile from "./assets/bg-main-mobile.png";
import bgDesktop from "./assets/bg-main-desktop.png";
import logo from "./assets/card-logo.svg";
import tick from "./assets/icon-complete.svg";

export default function App() {
	const [confirmed, setConfirmed] = useState(false);
	const [name, setName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cvc, setCvc] = useState("");
	const [year, setYear] = useState("");
	const [month, setMonth] = useState("");
	const [errors, setErrors] = useState({
		name: "",
		cardNumber: "",
		cvc: "",
		year: "",
		month: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newErrors: any = {};

		if (!name) {
			newErrors.name = "Cardholder name is required";
		}

		if (!/^[A-Za-z]+$/.test(name)) {
			newErrors.name = "Please enter a valid name.";
		}

		if (!/^\d{16}$/.test(cardNumber.replace(/\s+/g, ""))) {
			newErrors.cardNumber = "Card number must be 16 digits";
		}

		if (!/^\d{3}$/.test(cvc)) {
			newErrors.cvc = "CVC must be 3 digits";
		}

		if (!/^(0[1-9]|1[0-2])$/.test(month)) {
			newErrors.month = "Month must be between 01 and 12";
		}

		if (!/^\d{2}$/.test(year)) {
			newErrors.year = "Year must be 2 digits";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			setConfirmed(true);
		}
	};

	const formatCard = (cardNumber: string) => {
		let newformattedCardNumber = "";
		for (let i = 0; i < cardNumber.length; i++) {
			if (i > 0 && i % 4 === 0) {
				newformattedCardNumber += " ";
			}
			newformattedCardNumber += cardNumber[i];
		}
		return newformattedCardNumber;
	};

	return (
		<>
			<section>
				<div className="absolute -z-10 w-full">
					<picture>
						<source media="(min-width: 1024px)" srcSet={bgDesktop} />
						<img
							srcSet={bgMobile}
							alt=""
							className="w-full lg:w-1/3 lg:h-screen h-[260px] md:h-[250px]"
						/>
					</picture>
				</div>
				<div className="grid grid-cols-1 gap-8 lg:gap-0 lg:grid lg:grid-cols-6 mx-auto max-w-7xl">
					<div className="mt-6 lg:col-span-2 md:mt-8 lg:mt-10 mx-5 lg:mx-0 grid grid-cols-1 gap-3">
						<article className="front-card shadow p-3 md:p-5 flex flex-col justify-between font-semibold">
							<img className="logo w-10 md:w-20" src={logo} alt="" />
							<div className="text-white">
								<h2 className="card-font-size tracking-wider">
									{cardNumber ? formatCard(cardNumber) : "1234 4567 7890 1234"}
								</h2>
								<ul className="flex items-center md:text-xl justify-between mt-3 lg:mt-3 uppercase tracking-wide">
									<li className="text-sm">{name ? name : "Avikal Darolia"}</li>
									<li className="text-sm">
										{month ? month : "00"}/{year ? year : "00"}
									</li>
								</ul>
							</div>
						</article>
						<article className="back-card shadow lg:ml-24 lg:mt-32">
							<p className="absolute right-8 font-semibold text-sm md:right-12 lg:right-10 text-white md:text-xl tracking-widest">
								{cvc ? cvc : "123"}
							</p>
						</article>
					</div>

					<div className="p-5 md:p-0 lg:ml-24 lg:col-span-4">
						{!confirmed ? (
							<form
								onSubmit={handleSubmit}
								className="flex flex-col justify-center gap-6 max-w-lg mx-auto">
								<div className="">
									<label htmlFor="cardholder_name">Cardholder Name</label>
									<input
										type="text"
										className={errors.name && "outline-red-500"}
										placeholder="Eg. Avikal Darolia"
										value={name}
										onChange={(e) => setName(e.target.value)}
										required
									/>
									{errors.name && <p className="error">{errors.name}</p>}
								</div>
								<div className="">
									<label htmlFor="card_number">Card Number</label>
									<input
										type="text"
										placeholder="Eg. 1234 5678 9012 3456"
										maxLength={16}
										className={errors.cardNumber && "outline-red-500"}
										value={cardNumber}
										onChange={(e) => setCardNumber(e.target.value)}
										required
									/>
									{errors.cardNumber && (
										<p className="error">{errors.cardNumber}</p>
									)}
								</div>
								<div className="flex items-center justify-between gap-6">
									<div className="flex flex-col">
										<label htmlFor="expiry_date">Exp. Date(MM/YY)</label>
										<div className="flex gap-3">
											<input
												type="text"
												className={errors.month && "outline-red-500"}
												placeholder="MM"
												maxLength={2}
												value={month}
												onChange={(e) => setMonth(e.target.value)}
												required
											/>
											<input
												type="text"
												placeholder="YY"
												className={errors.year && "outline-red-500"}
												value={year}
												onChange={(e) => setYear(e.target.value)}
												required
												maxLength={2}
											/>
										</div>
										{errors.month && <p className="error">{errors.month}</p>}
										{errors.year && <p className="error">{errors.year}</p>}
									</div>
									<div className="flex flex-col">
										<label htmlFor="cvc">CVC</label>
										<input
											type="text"
											placeholder="Eg. 123"
											value={cvc}
											className={errors.cvc && "outline-red-500"}
											onChange={(e) => setCvc(e.target.value)}
											maxLength={3}
											required
										/>
										{errors.cvc && <p className="error">{errors.cvc}</p>}
									</div>
								</div>
								<button className="btn w-full" type="submit">
									Confirm
								</button>
							</form>
						) : (
							<ConfirmationScreen setConfirmed={setConfirmed} />
						)}
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
			<div className="flex flex-col mt-[250px] md:mt-[280px] justify-center gap-4 max-w-lg mx-auto">
				<img src={tick} alt="" className="block mx-auto" />
				<h1 className="text-slate-600 text-center md:text-3xl lg:my-6 uppercase">
					Thank you
				</h1>
				<p className="text-slate-400 text-center">
					We've added your card details
				</p>
				<button
					onClick={() => setConfirmed(false)}
					className="btn block mx-auto w-full">
					Continue
				</button>
			</div>
		</>
	);
}
