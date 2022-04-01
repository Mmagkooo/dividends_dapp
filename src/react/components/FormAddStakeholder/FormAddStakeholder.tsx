/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React from 'react';
import { Col, Input, Form, FormGroup, Label, Button } from 'reactstrap';

import { useAppContext } from '../../context';

const ACCOUNTS = [
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
    '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
    '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
    '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
]

const FormAddStakeholder = () => {

    const { updateStakeholder } = useAppContext();

    const handleSelectChange = React.useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const isValid = form.checkValidity();
        if(isValid){
            const accountElement = form.elements.namedItem('account');
            const sharesElement = form.elements.namedItem('shares');
            if (
                accountElement !== null && 'value' in accountElement && 
                sharesElement !== null && 'value' in sharesElement
            ){
                updateStakeholder({
                    address: accountElement.value,
                    shares: Number(sharesElement.value),
                    unclaimed: 0,
                })
            }
        }
    }, [ updateStakeholder ]) ;

    return (
        <section>
            <h2 className="h4 mb-4">Add or edit stakeholder</h2>
            <Form onSubmit={ handleSelectChange }>
                <FormGroup row>
                    <Label for="account" xs="4">
                        Account number
                    </Label>
                    <Col xs="8">
                        <Input
                            id="account"
                            type="select"
                            placeholder="Select account"
                            required
                        >
                            { ACCOUNTS.map((account) => (
                                <option key={ account } value={ account }>
                                    { account }
                                </option>
                            )) }
                        </Input>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="shares" xs="4">
                        Share amount
                    </Label>
                    <Col xs="8">
                        <Input
                            id="shares"
                            placeholder="Enter amount"
                            type="number"
                            min={ 0 }
                            max={ 1_000 }
                            required
                        />
                    </Col>
                </FormGroup>
                <FormGroup row >
                    <Col xs={{ offset: 4, size: 8 }} >
                        <Button color="primary">
                            Submit
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        </section>
    );
};

export default FormAddStakeholder;