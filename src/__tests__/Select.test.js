import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactSelectComponent from "../components/ReactSelectComponent";

test("react select: user.type triggers enter", async () => {
	const user = userEvent.setup({
		pointerMap: [{ name: "MouseLeft", pointerType: "mouse", button: 0 }],
	});

	render(<ReactSelectComponent />);

	try {
		// touch event is already present in testing environment but not in browser
		document.createEvent("TouchEvent");
		console.info("------Device is touch enabled------");
	} catch (e) {
		console.log("------No touch device------");
	}

	// open the dropdown
	const selectDropdown = screen.getAllByRole("combobox")[0];

	await user.click(selectDropdown);

	const pear = await screen.findByText("Pear");
	expect(pear).toBeInTheDocument();

	// select Pear
	await user.type(selectDropdown, "{enter}");
	// expect Pear to be selected
	const pearOption = await screen.findByLabelText("Remove Pear");
	expect(pearOption).toBeInTheDocument();

	// select Banana
	await user.type(selectDropdown, "{enter}");
	// expect Banana to be selected
	const bananaOption = await screen.findByLabelText("Remove Banana");
	expect(bananaOption).toBeInTheDocument();

	// select Apple
	await user.type(selectDropdown, "{enter}");
	// expect Apple to be selected
	const appleOption = await screen.findByLabelText("Remove Apple");
	expect(appleOption).toBeDefined();
});

test("react-select: user.keyboard triggers enter", async () => {
	const user = userEvent.setup();

	render(<ReactSelectComponent />);

	try {
		// touch event is already present in testing environment
		// but not in browser
		document.createEvent("TouchEvent");
		console.info("------Device is touch enabled------");
	} catch (e) {
		console.log("------No touch device------");
	}

	// open the dropdown
	const selectDropdown = screen.getAllByRole("combobox")[0];

	await user.click(selectDropdown);

	const pear = await screen.findByText("Pear");
	expect(pear).toBeInTheDocument();

	// select Pear
	await user.keyboard("{enter}");
	// expect Pear to be selected
	const pearOption = await screen.findByLabelText("Remove Pear");
	expect(pearOption).toBeInTheDocument();
});

// fails if blurInputOnSelect is not set to false
test("react select with fireEvent ", async () => {
	render(<ReactSelectComponent />);

	const inputElement = screen.getByRole("combobox");
	await act(() => userEvent.click(inputElement));
	const options = await screen.findAllByRole("option");
	expect(options.length).toEqual(4);

	const pear = await screen.findByText("Pear");
	const banana = await screen.findByText("Banana");
	const orange = await screen.findByText("Orange");

	act(() => {
		fireEvent.keyDown(pear, { key: "Enter", code: "Enter", charCode: 13 });
	});

	const pearOpt = await screen.findByLabelText("Remove Pear");
	expect(pearOpt).toBeDefined();

	act(() => {
		fireEvent.keyDown(banana, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});
	});

	const banOpt = await screen.findByLabelText("Remove Banana");
	expect(banOpt).toBeDefined();

	act(() => {
		fireEvent.keyDown(inputElement, {
			key: "ArrowDown",
			code: "Arrow Down",
			charCode: 40,
		});
	});

	act(() => {
		fireEvent.keyDown(orange, {
			key: "Enter",
			code: "Enter",
			charCode: 13,
		});
	});

	const orangeOpt = await screen.findByLabelText("Remove Orange");
	expect(orangeOpt).toBeDefined();
});

// fails if blurInputOnSelect is not set to false
test("react select userEvent", async () => {
	const user = userEvent.setup();
	render(<ReactSelectComponent />);

	const inputElem = screen.getByRole("combobox");

	await act(() => user.click(inputElem));

	const options = await screen.findAllByRole("option");
	expect(options.length).toEqual(4);

	user.keyboard("[Enter]");
	user.keyboard("[Enter]");
	user.keyboard("[Enter]");

	const pear = await screen.findByLabelText("Remove Pear");
	expect(pear).toBeInTheDocument();

	const banana = await screen.findByLabelText("Remove Banana");
	expect(banana).toBeInTheDocument();

	const apple = await screen.findByLabelText("Remove Apple");
	expect(apple).toBeInTheDocument();
});
