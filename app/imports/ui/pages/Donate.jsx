import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for adding a document. */
class Donate extends React.Component {


  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={8}>
          <Header as='h1' inverted>Donate via Paypal, Debit, or Credit</Header>
          <Header as='h3' inverted>The maintenance department is always looking for extra
            funds to help keep the campus great.</Header>


        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="4C8LLQBBS36UY" />
          <input type="hidden" name="item_name" value="Every dollar counts" />
          <input type="hidden" name="currency_code" value="USD" />
          <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                 border="0" name="submit" title="PayPal - The safer, easier way to pay online!"
                 alt="Donate with PayPal button" />
          <img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
        </form>
          </Grid.Column>
          <p as ='p'></p>

        </Grid>
    );
  }
}

export default Donate;
