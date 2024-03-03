import React from "react";
import AsyncSelect from "react-select/async";

export default function ReactSelectComponent() {
	return (
		<div>
			<AsyncSelect
				defaultOptions
				loadOptions={async () =>
					new Promise((resolve) => {
						setTimeout(() => {
							resolve([
								{ value: "Pear", label: "Pear" },
								{ value: "Banana", label: "Banana" },
								{ value: "Apple", label: "Apple" },
								{ value: "Orange", label: "Orange" },
							]);
						}, 1000);
					})
				}
				closeMenuOnSelect={false}
				onMenuClose={() => {
					console.log("Menu closed!");
				}}
				isMulti
				blurInputOnSelect={false}
			/>
		</div>
	);
}
