import React from 'react';
import { Grid, Segment, Header, Button, Image, Form } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import MultiSelect from '../components/MultiSelect';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { openCloudinaryWidget } from '../components/open-cloudinary-widget';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Reports } from '/imports/api/report/Reports';


/** Renders the Page for adding a document. */
class AddReport extends React.Component {

  constructor(props) {
    super(props);
    this.state = { picture: '' };
  }

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, location, datePosted, tag, description, status } = data;
    const image = this.state.picture;
    const owner = Meteor.user().username;
    console.log(data);
    Reports.insert({ title, location, datePosted, image, tag, description, owner, status },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
            Meteor.call(
                'sendEmail',
                'Yuuma <yuma2@hawaii.edu>',
                'bob@example.com',
                'Hello from Meteor!',
                'This is a test of Email.send.',
                (err, result) => { console.log(err, result); },
            );
          }
        });
  }

  getUrl = (value) => {
    this.setState({ picture: value });
    console.log(value);
  }

   handleFormChange = (e, { value }) => {
    console.log(e, value);
    this.setState({ picture: value });
  }

   handleUploadPicture = async (e) => {
    e.preventDefault();
    const cloudinaryResult = await openCloudinaryWidget(this.getUrl);
     console.log(cloudinaryResult);
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;

    const { picture } = this.state;
    console.log(picture);

    /** Create a schema to specify the structure of the data to appear in the form. */
   const formSchema = new SimpleSchema({
      title: {
      type: String,
          max: 35,
    },
      location: {
        type: String,
        max: 35,
      },
      datePosted: {
        type: Date,
        defaultValue: new Date(),
      },
      tag: {
        type: Array,

      },
      'tag.$': {
        type: String,
        allowedValues: ['Vandalism', 'Water Damage', 'Fire Damage', 'Structural', 'Natural/Plants',
          'Electrical', 'Lost & Found', 'Miscellaneous'],
      },
      description: {
        type: String,
      },
      image: {
        type: String,
        defaultValue: picture,
      },
      status: {
        type: String,
        allowedValues: ['Pending', 'In-Progress...', 'Fixed!'],
        defaultValue: 'Pending',
      },
    });

    const imageStyle = {
      maxHeight: 90,
      maxWidth: 150,
      paddingTop: 15,
    };

    return (

        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center" inverted>Add Report</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <Form.Group widths={'equal'}>
                  <TextField name='title' placeholder= '35 character limit' />
                <TextField name='location' placeholder= '35 character limit' />
                <MultiSelect name='tag' placeholder= 'Select one or multiple' />
                <HiddenField name='status'/>
                </Form.Group>
                <Form.Group widths={'equal'}>
                <React.Fragment>
                  <Grid.Column width={2}><b>Image</b><b className="redText">*</b></Grid.Column>
                  <Grid.Column width={2}>
                    <Image src={picture} style={imageStyle} floated="left"/>
                    <Button basic={true} color="green" onClick={this.handleUploadPicture}>Upload</Button>
                  </Grid.Column>
                </React.Fragment>
                  <LongTextField name='description' placeholder= 'Describe the event here...' />
                </Form.Group>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default AddReport;
