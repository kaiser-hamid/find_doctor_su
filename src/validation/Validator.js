class Validator {
    constructor(formData, rules) {
        this.formData = formData;
        this.rules = rules;
        this.error = null;
    }

    validate() {
        rule_loops:
            for (let field in this.rules) {
                //checking rules field exists in form data
                const fieldExists = Object.keys(this.formData).includes(field);
                if (!fieldExists) {
                    this.error = "Field mismatch! Check rules and form data.";
                    break;
                }
                //end checking
                for (let rules of this.rules[field]) {
                    console.log("rules", rules);
                    if (rules === "required") {
                        if (!this.v_required(field)) {
                            break rule_loops;
                        }
                    }
                    if (rules === "email") {
                        if (!this.v_email(field)) {
                            break rule_loops;
                        }
                    }
                    if (rules === "numeric") {
                        if (!this.v_numeric(field)) {
                            break rule_loops;
                        }
                    }
                }

            }
        return this.error;
    }

    v_required(field) {
        const emptyRegex = /^\s*$/;
        const result = emptyRegex.test(this.formData[field]);
        if(result){
            this.error = `The ${this.parseFieldName(field)} field is required`;
        }
        return !result;
    }

    v_email(field) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const result = emailRegex.test(this.formData[field]);
        if(!result){
            this.error = `The ${this.parseFieldName(field)} field must be a valid email`;
        }
        return result
    }

    v_numeric(field) {
        const floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
        const result = floatRegex.test(this.formData[field]);
        if(!result){
            this.error = `The ${this.parseFieldName(field)} field must be a number`;
        }
        return result;
    }

    parseFieldName(raw){
        return  raw.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    }

}

export default Validator;