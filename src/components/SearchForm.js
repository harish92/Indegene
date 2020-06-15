import React, {useReducer} from "react";
import {Button, Form, FormGroup, Input} from "reactstrap";

const SearchForm = props => {

    const [fields, setFields] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            title: "",
            year: ""
        }
    );

   const _handleChange = e => {
       setFields({[e.target.name]: e.target.value})
    }

    const _submit = () => {
        if (!fields.title || !fields.year) alert('please enter title and year')
        else props.search(fields)
    }


    return(
        <Form inline style={{marginBottom: '30px', marginLeft: '40px'}}
              onSubmit={(e) => e.preventDefault()}>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="text" name="title" id="title" placeholder="Title"
                       onChange={_handleChange}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input type="number" name="year" maxLength={4} minLength={4}
                       placeholder="Year" onChange={_handleChange}/>
            </FormGroup>
            <Button className="btn btn-primary" type="submit"
                    onClick={_submit}>Search</Button>

        </Form>
    );

}

export default SearchForm;
