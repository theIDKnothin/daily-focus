/**
 * Stateless goal form: data and submit intent arrive via props; no storage or API calls.
 */
export function mountGoalForm(host, props) {
    host.replaceChildren();
    const form = document.createElement("form");
    form.className = "form";
    form.id = "goal-form";
    form.noValidate = true;
    const label = document.createElement("label");
    label.className = "label";
    label.htmlFor = props.inputId;
    label.textContent = props.labelText;
    const input = document.createElement("input");
    input.className = "input";
    input.type = "text";
    input.id = props.inputId;
    input.name = "goal";
    input.autocomplete = "off";
    input.placeholder = props.placeholder;
    input.value = props.initialValue;
    const button = document.createElement("button");
    button.className = "button";
    button.type = "submit";
    button.textContent = props.submitLabel;
    form.append(label, input, button);
    host.append(form);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        props.onSubmit(input.value);
    });
    return {
        setInputValue: (value) => {
            input.value = value;
        },
        getInputValue: () => input.value,
    };
}
