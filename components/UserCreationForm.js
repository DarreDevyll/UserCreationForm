import { Component } from "react"
import { 
    StyledForm,
    Label, 
    Field, 
    Submit, 
    FieldContainer, 
    DropdownMenu, 
    SelectionField, 
    SelectOption, 
    CompletedFormMessage,
    Req
} from "./styles/UserCreationForm.styled"


class UserCreationForm extends Component {
    constructor (props) {
        super(props);

        this.state = { 
            Occupations: [],
            States: [],
            FormData: {
            "name": "",
            "email": "",
            "password": "",
            "occupation": "",
            "state": ""
            },
            Submitted: false
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getFormOptionData = this.getFormOptionData.bind(this);
    }
    
    // Getting Occupation and State options from endpoint
    getFormOptionData() {
        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then((res) => res.json())
        .then((data) => {
           this.setState({Occupations: data["occupations"]});
           this.setState({States: data["states"]});
        })
        .catch((err) => {
           console.log(err.message);
        });
        return;
    };
    
    // Changing FormData apon fields being filled out
    handleChange(event) {
        const field = event.target.name;
        var FormData = this.state.FormData;
        FormData[field] = event.target.value;
        this.setState({FormData});
    }

    // Posting data to endpoint and changing Submitted flag if successful
    handleSubmit(event) {
        event.preventDefault();

        // HTTP options for fetch
        const options = {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.FormData)
        }

        // Posting form to endpoint, and changing Submitted flag if successful (status = 201)
        fetch('https://frontend-take-home.fetchrewards.com/form', options)
        .then((response) => {
            if (response.status == 201){
                this.setState({Submitted: true});
                return response.json();
            }
        })
        .catch((err) => {
            console.log(err.message);
        })
    }

    // Getting form options on component mount
    componentDidMount() {
        this.getFormOptionData();
    }

    // Rendering form based on styled components defined in 'UserCreationForm.styled.js'
    render() {
    return (
        <>
        <CompletedFormMessage show={this.state.Submitted}>
            Form Successfully Submitted<br /> Thank you for your submission
        </CompletedFormMessage>
        <StyledForm onSubmit={this.handleSubmit} show={this.state.Submitted}>
            <FieldContainer>
                <Label>Full Name<Req>*</Req></Label>
                <Field type="text" name="name" required 
                    value={this.state.FormData["name"]} onChange={this.handleChange} />

            </FieldContainer>
            <FieldContainer>
                <Label>Email<Req>*</Req></Label>
                <Field type="email" name="email" required 
                    value={this.state.FormData["email"]} onChange={this.handleChange} />

            </FieldContainer>
            <FieldContainer>
                <Label>Password<Req>*</Req></Label>
                <Field type="password" name="password" required 
                    value={this.state.FormData["password"]} onChange={this.handleChange} />

            </FieldContainer>
            <FieldContainer>
                <DropdownMenu>
                <Label>Occupation<Req>*</Req></Label>
                <SelectionField name="occupation" required 
                    value={this.state.FormData["occupation"]} onChange={this.handleChange}>

                    <SelectOption value=''>Select...</SelectOption>
                    {Object.keys(this.state.Occupations).map(key => {
                        return (<SelectOption value={this.state.Occupations[key]}>{this.state.Occupations[key]}</SelectOption>)
                    })}

                </SelectionField>
                </DropdownMenu>
            </FieldContainer>
            <FieldContainer>
                <DropdownMenu>
                <Label>State<Req>*</Req></Label>
                <SelectionField name="state" 
                    value={this.state.FormData["state"]["name"]} onChange={this.handleChange} required>

                    <SelectOption value=''>Select...</SelectOption>
                    {Object.keys(this.state.States).map(key => {
                        return (<SelectOption value={this.state.States[key]["name"]}>{this.state.States[key].abbreviation}</SelectOption>)
                    })}

                </SelectionField>
                </DropdownMenu>
            </FieldContainer>
            <FieldContainer>
                <Submit type="submit" value="Submit" />
            </FieldContainer>
        </StyledForm>
        </>
    )
    }
}

export default UserCreationForm;