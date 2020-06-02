// ==Bookmarklet==
// @name AWS Temporary Credentials Bookmarklet
// @author Ryan Jaeger (@rjjaegeraws) , Shea Phillips (@sheaphillips)
// @style !loadOnce https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.min.css
// @script https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @script https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @script https://sdk.amazonaws.com/js/aws-sdk-2.663.0.min.js
// ==/Bookmarklet==

let $myjq = jQuery.noConflict();

$myjq(document).ready(function () {

	$myjq('fieldset').before('<div id="dialog" title="AWS Credentials"> \
                <p>Copy and paste the following commands into your shell to set up your AWS CLI environment variables.</p> \
                <pre style="white-space: pre-wrap;word-wrap: break-word;padding: 1rem;">Loading...</pre> \
                <button id="copyBtn" type="button" class="click-to-copy">Click to copy</button> \
                </div>');
	$myjq('#dialog').dialog({autoOpen: false, width: '600px'});

	$myjq('div.saml-role').each(function (index, value) {
		$myjq('label', value).before('<button type="button" class="showTempCredsButton" style="margin-right: 10px;" id="showTempCreds_' + index + '">Show Temporary Credentials</button>')
	});

	let samlResponse = $myjq('#saml_form input[name="SAMLResponse"]').first().val();

	$myjq('button.showTempCredsButton').click(function (val) {

		$myjq("#dialog").dialog("open");

		$myjq('#dialog pre').first().html('Loading...');

		let roleARN = $myjq('input', $(this).parent()).first().val();

		let decodedString = atob(samlResponse);

		let capturingRegex = new RegExp(">(?<provider>arn:aws:iam::\\d+:saml-provider/\\S+)," + roleARN + "<");
		let found = decodedString.match(capturingRegex);
		let providerId = found.groups.provider;

		let sts = new AWS.STS();
		let params = {
			DurationSeconds: 3600,
			PrincipalArn: providerId,
			RoleArn: roleARN,
			SAMLAssertion: samlResponse
		};

		sts.assumeRoleWithSAML(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
				$myjq('#dialog pre').first().html('Error: ' + err.message);
			} else {

				let accessKeyId = data.Credentials.AccessKeyId;
				let secretKey = data.Credentials.SecretAccessKey;
				let sessionToken = data.Credentials.SessionToken;

				let text = '\
export AWS_ACCESS_KEY_ID="' + accessKeyId + '" \n\
export AWS_SECRET_ACCESS_KEY="' + secretKey + '" \n\
export AWS_SESSION_TOKEN="' + sessionToken + '" \n\
export AWS_DEFAULT_REGION=ca-central-1 \n';

				$myjq('#dialog pre').first().html(text);

				$myjq('#dialog').on('click', '#copyBtn', function () {
					let text = $('#dialog pre').text();
					let $tempInput = $("<textarea>");
					$myjq("body").append($tempInput);
					$tempInput.val(text).select();
					document.execCommand("copy");
					$tempInput.remove();
				});
			}
		});
	})
});

