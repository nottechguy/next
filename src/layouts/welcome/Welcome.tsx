import Button, { AnchorButton } from "@components/button/Button";
import Checkbox from "@components/checkbox/Checkbox";
import { Chip } from "@components/chip/Chip";
import { Chipset } from "@components/chip/Chipset";
import Form from "@components/form/Form";
import FormField from "@components/form/FormField";
import FilledTextarea from "@components/textfield/FilledTextarea";
import FilledTextfield from "@components/textfield/FilledTextfield";
import OutlinedTextarea from "@components/textfield/OutlinedTextarea";
import OutlinedTextfield from "@components/textfield/OutlinedTextfield";

function Welcome() {
  return (
    <div>
      <div>
        <h2>Welcome</h2>
      </div>
      <div>
        <Chipset design="filled">
          <Chip text="filter" />
        </Chipset>
      </div>
      <div>
        <Button text="Outlined" design="outlined" type="button" leadingIcon="menu" />
        <Button text="Contained" design="contained" type="button" trailingIcon="star" />
        <Button text="Text" design="text" type="button" />
        <AnchorButton text="Anchor" design="raised" type="button" href="#/profile" />
      </div>
      <div>
        <Checkbox />
      </div>
      <div>
        <Form>
          <FormField>
            <FilledTextfield label="Name" type="text" value="Smith" required supportingText="Complete"/>
          </FormField>
          <FormField>
            <FilledTextfield label="Lastname" type="text" characterCounter="20" />
          </FormField>
          <FormField>
            <FilledTextfield label="Email" type="text" leadingIcon="mail" />
          </FormField>
          <FormField>
            <FilledTextfield label="Lastname" type="text" trailingIcon="visibility" />
          </FormField>
          <FormField>
            <FilledTextfield label="Total" type="text" prefix="$" suffix="MXN" pattern="[0-9]"/>
          </FormField>
          <FormField>
            <FilledTextarea label="Message"/>
          </FormField>
        </Form >
      </div>
      <div>
      </div>
    </div>
  );
}

export default Welcome;
