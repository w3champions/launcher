export const UPDATE_URL_PROD = "https://update-service.w3champions.com/";
export const UPDATE_URL_PROD_CHINA = "http://123.57.23.5:25053/";
export const UPDATE_URL_TEST = "https://update-service.test.w3champions.com/";

export const NEWS_URL_PROD = "https://statistic-service.w3champions.com/";
export const NEWS_URL_PROD_CHINA = "http://123.57.23.5:25052/";
export const NEWS_URL_TEST = "https://statistic-service.test.w3champions.com/";

export const IDENTIFICATION_URL_PROD = "https://identification-service.w3champions.com/";
export const IDENTIFICATION_URL_PROD_CHINA = "http://123.57.23.5:25051/";
export const IDENTIFICATION_URL_TEST = "https://identification-service.test.w3champions.com/";

export const FLO_CONTROLLER_HOST_URL_PROD = 'service.w3flo.com';
export const FLO_CONTROLLER_HOST_URL_PROD_CHINA = 'ea2d46.pathx.ucloudgda.com';
export const FLO_CONTROLLER_HOST_URL_TEST = '157.90.1.251';

export const IDENTIFICATION_PUBLIC_KEY_PROD = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAtm4he5E9SkGn3hI2cSIH
H+3+jxeP/J5oSrOecUik7rwOHI4nKLhvfk1mwIsyQkMXRgEGXkToPTk5CAgkTvq9
V1sZev61cl/XqE1ljB3puAQPfqJ04saheZPRfWNKcLRIT4WZoj7BUdq3yjth7ApU
S7OCUusd/7khjDQ8FvBq2u9n2tuI/TOUFLRurLjj4JLAnYXElawa3oLjLs8GCwR6
oaj0km/mJhi51dqf4UhIrcspi8era/B5fu1ArYb7xsE08ityUGZGp8A7Gl/YQbUP
kwWh7iTSG9+s9+eXIm91oNueKfT80AnlXihJcr2PQkDoltA4JZzGy7KAcXafT4ve
LxwBkiZD/LrgAhPYOrJG75ADsoa5GgHJHPSGlj1rY8ZWmuyYi2ggS299ozPzGXFA
zku68fLBsRpPFROOk88t8hWeKDOrCjnF5paO3znBhLIa9GkNAHsnv46qMPsuf7Th
Y7s62322V4NL5U11p8taYFHSKBk0o3I9UU8LPWbR5pAFoVTeug0DrTAB+JcFKuvw
hl9o6XLaWQDBAhQehusmcx83yEj+yReLDzUy6hSQ0vHTTilRTrb4EqgYFEyqXXeI
qE/jHJw6EJwK5gpBhFPqcCTyavTtKacbPY7j58QY16FzJ1z9p4emAiesbJWNJxaH
xWaVmEt7VZ/6DeXCsish7xsCAwEAAQ==
-----END PUBLIC KEY-----
`

export const IDENTIFICATION_PUBLIC_KEY_TEST = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA6N6yiNe392lG5W+4LKDD
NOr53vvolpC7098x6tWbw0E3Jkg8n3Y8A1qC9+7tFYXV8I5UlQdT1Oy/BxbPuNR0
S/zr93WeYkLCWlfh7yjFKwNbRSoWXL36lFhy85H+5HNGfjKpTm5HLTXKRH1P4lLk
3Gfz0p84OXeumUs9cDRz7WSSEeGTpD4oA3qGgS18F2U394No/YfNIOyJCOzDRaN9
Mx8H2VcsOvZnGqeCWKtY+7fh1YQQqR2ebZb1eA0qziloxnXhI2sUXUnjK68YIV3d
XaFhYuSsJQoXuHzIA1opcFkGhkQI+wVyLzaAPhWiU0MCvoRf+kxfmW8gaUdT+2ar
o2C2lXp5Y/0xyrl3w0bzinQ79n+PH0pixu00r4/892IksS5SexdZ1Ka5TaHdnWGR
jM1p1DmFqyKvm98wsoq4ZsgYVrMHOY3qDRdb4ss93HjgA5gh6q3rnLFdUC8T+FgL
kwZIsRm4+a0by3xwglHgWBOu81Pzy4F1dQOV3C31cgLsMZvBW0D01I7F/Y5YFU1A
lLgKocWLLDEnWMh+078H3PyRH9W3vuQGfD6CAfEu8jbETgZeZqiyR45yDGeyZlWE
btiZjF00dkblGb5z5BFRtYHwL2Cfi6XJnby77NYHPTUH1GrfdL+sp7QEDe9k/4h6
sYbv9oAYja2AuGxDba1MJHUCAwEAAQ==
-----END PUBLIC KEY-----
`

export const OAUTH_ENABLED = false;

export const CHINA_ALIYUN_OSS_URL = "http://w3champions.oss-cn-shanghai.aliyuncs.com";
export const CHINA_WEBUI_SRC= `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Warcraft 3 UI</title>
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, minimal-ui" />
        <script>
            window.__DEBUG = new Boolean('').valueOf();
        </script>
    </head>
    <body>
        <div id="root"></div>
        <div id="portal"></div>
		
		<script>
			var logCalls = [];
			var w3cClientVersion = 1;
			console.origLog = console.log;
			console.log = (...args) => {
				logCalls.push(...args);
				console.origLog("log");
				console.origLog(...args);
			}

		</script>
        <script src="GlueManager.js"></script>
		<script src="${CHINA_ALIYUN_OSS_URL}/ingame/w3champions.js"></script>
    </body>
</html>
`