import mjml2html from 'mjml';

function passwordResetTemplate(): string {
    const htmlOutput = mjml2html(
        `
      <mjml>
        <mj-body>
          <mj-section>
            <mj-column>
              <mj-divider border-color="#5EA898"></mj-divider>
              <mj-text font-size="24px" font-weight="bold" color="#5EA898" font-family="helvetica">
                Hello !
              </mj-text>
              <mj-text font-size="20px" color="#5EA898" font-family="helvetica">
                Welcome to CTHunt
              </mj-text>
              <mj-divider border-color="#5EA898"></mj-divider>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>
    `,
    );
    if (htmlOutput.html.length === 0) return '';
    return htmlOutput.html;
}

export default passwordResetTemplate;
