describe("pattern과 match 학습", function() {

	//문자열을 추출하기 위한 기준
	it("'안녕하세요'.match(/안녕/).toString() 을 실행시키면 '안녕'이 추출되어야 한다.", function () {
		expect('안녕하세요'.match(/안녕/).toString()).toEqual('안녕');
	});

	it("'안녕하세요'.match(/^안녕/).toString() 을 실행시키면 '안녕'이 추출되어야 한다.", function () {
		expect('안녕하세요'.match(/^안녕/).toString()).toEqual('안녕');
	});

	it("'안녕하세요'.match(/^안녕/)이 배열을 반환함을 Array.isArray메소드로 확인할 수 있다.", function () {
		expect(Array.isArray('안녕하세요'.match(/^안녕/))).toEqual(true);
	});

	it("'sports'.match(/spt/)을 평가하면 null이 반환된다. (js에서 null은 값이라는 것을 명심)", function(){
		expect('sports'.match(/spt/)).toEqual(null);
	});
});

describe("파라메터에 패턴 할당하기", function() {

	it("파라메터에 /sp/라고 할당한 regex는 'sp'를 출력한다.", function () {
		var pattern = /sp/;
		expect('sports'.match(pattern).toString()).toEqual('sp');
	});

	it("파라메터에 /sp/라고 할당한 regex는 exec메소드를 사용할 경우에도 'sp'를 출력한다.", function () {
		var pattern = /sp/;
		expect(pattern.exec('sports').toString()).toEqual('sp');
	});

});

describe("플래그 사용하기", function() {

	describe("i플래그", function() {
		it("'SPORTS'.match(/s/i).toString() 을 실행하면 대문자 'S'를 출력한다 ", function(){
			expect('SPORTS'.match(/s/i).toString()).toEqual('S');
		});
	});

	describe("g플래그", function() {
		it("'sports'.match(/s/g).toString() 을 실행하면 문자열 's,s'를 출력한다 ", function(){
			expect('sports'.match(/s/g).toString()).toEqual('s,s');
		});

		it("/s/g.exec('sports').toString() 를 실행하면 g플래그를 사용하더라도 문자열 's'를 출력한다 ", function(){
			expect(/s/g.exec('sports').toString()).toEqual('s');
		});
	});

	describe("m플래그", function() {

		var value = "";

		beforeEach(function() {
			value = 'sports\nMultiLine\nMultiLine';
		});

		it(value + " 를 대상으로 value.match(/^Multi/) 을 실행하면 매치할 수 없다 ", function(){
			expect(value.match(/^Multi/)).toEqual(null);
		});

		it(value + " 를 대상으로 value.match(/^Multi/m) 을 실행하면 처음의 'Multi' 만 반환한다 ", function(){
			expect(value.match(/^Multi/m).toString()).toEqual('Multi');
		});

		it(value + " 를 대상으로 value.match(/^Multi/gm) 을 실행하면 'Multi,Multi' 가 반환된다 ", function(){
			expect(value.match(/^Multi/gm).toString()).toEqual('Multi,Multi');
		});
	});
});

describe("대체기능 사용하기", function() {
	it("'12_34_56'.match(/23|34|56/).toString() 를 평가하면 12_34_56 기준으로 가장 앞에 있는 패턴 1개가 매치된다.", function(){
		expect('12_34_56'.match(/23|34|56/).toString()).toEqual('34');
	});

	it("'12_34_56'.match(/56|34|23/).toString() 를 평가하면 12_34_56 기준으로 가장 앞에 있는 패턴 1개가 매치된다.", function(){
		expect('12_34_56'.match(/56|34|23/).toString()).toEqual('34');
	});
});

describe("dot 사용하기", function() {

	it("'sports'.match(/.s/).toString() 를 평가하면 s앞에 임의의 문자1개가 추가된 문자열 ts가 매치된다.", function(){
		expect('sports'.match(/.s/).toString()).toEqual('ts');
	});

	it("'sports'.match(/s./).toString() 를 평가하면 s뒤에 임의의 문자1개가 추가된 문자열 sp가 매치된다.", function(){
		expect('sports'.match(/s./).toString()).toEqual('sp');
	});

	it("'sop,sap,sac,sp'.match(/s.p/g).toString() 를 평가하면 s와 p사이에 임의의 문자1개가 추가된 문자열 'sop,sap'가 매치된다.", function(){
		expect('sop,sap,sac,sp'.match(/s.p/g).toString()).toEqual('sop,sap');
	});
});

describe("공백문자 매치하기", function() {

	it("탭 문자인 '\\u0009'.match(/\\t/)를 매치하면 1개가 매치된다", function(){
		expect('\u0009'.match(/\t/).length).toEqual(1);
	});

	it(" 줄 분리자인 '\\u000A'.match(/\\n/)를 매치하면 1개가 매치된다", function(){
		expect('\u000A'.match(/\n/).length).toEqual(1);
	});
});

describe("연습문제", function() {
	var value = 'ABCDE ABCXE';
	// |를 사용하여 [BC,DE,BC] 매치

	it("'ABCDE ABCXE'.match(/BC|DE/g).toString()이 평가되면 'BC,DE,BC'가 반환된다. ", function(){
		expect('ABCDE ABCXE'.match(/BC|DE/g).toString()).toEqual('BC,DE,BC');
	});
	// .를 사용하여 [ABCD, BCXE] 매치
});

describe("매치 위치 학습", function() {

	describe(" ^ 처음부터 매치하기", function() {
		it("'12_34_12'.match(/^12/).toString()이 평가되면 '12'가 반환된다. ", function(){
			expect('12_34_12'.match(/^12/).toString()).toEqual('12');
		});

		it("'12_34_12'.match(/^12/)이 평가되면 null이 반환된다. ", function(){
			expect('12_34_12'.match(/^34/)).toEqual(null);
		});

		it("'12\n34\n12'.match(/^12/m).toString()이 평가되면 '12'가 반환된다. ", function(){
			expect('12\n34\n12'.match(/^12/m).toString()).toEqual('12');
		});
	});

	describe(" $ 끝에 매치하기", function() {
		it("'12_34_56'.match(/56$/).toString()이 평가되면 '56'가 반환된다. ", function(){
			expect('12_34_56'.match(/56$/).toString()).toEqual('56');
		});

		it("'12_34_56'.match(/34$/)이 평가되면 null이 반환된다. ", function(){
			expect('12_34_12'.match(/34$/)).toEqual(null);
		});
	});

	describe(" \B 63개 문자에 매치하기", function() {
		describe("영문자(52개), 숫자(10개), 언더바(1개)에 매치되는 기능", function() {
			describe("\B에 매치된 문자는 반환하지 않는다!<주의>", function() {

				it("'A12A 12B 12A'.match(/12\B/g).toString() 이 평가되면 '12,12,12'가 반환된다. ", function(){
					expect('A12A 12B 12A'.match(/12\B/g).toString()).toEqual('12,12,12');
				});

				it("'A12 B12 12'.match(/12\B/g) 이 평가되면 null이 반환된다. ", function(){
					expect('A12 B12 12'.match(/12\B/g)).toEqual(null);
				});

				it("'A12 12 C12'.match(/\B12/g).toString() 이 평가되면 12,12가 반환된다. ", function(){
					expect('A12 12 C12'.match(/\B12/g).toString()).toEqual('12,12');
				});
			});
		});
	});

	describe(" \b 63개 이외의 문자에 매치하기", function() {
		describe("영문자(52개), 숫자(10개), 언더바(1개)이외의 문자에 매치되는 기능", function() {
			describe("\b는 '아무것도 없음'도 매치하므로 주의할것!!", function() {

				it("'A12 12B 12C'.match(/12\b/g).toString() 이 평가되면 '12'가 반환된다. ", function(){
					expect('A12 12B 12C'.match(/12\b/g).toString()).toEqual('12');
				});

				it("'A12 12B 12'.match(/12\b/g).toString() 이 평가되면 '12,12'가 반환된다. ", function(){
					expect('A12 12B 12'.match(/12\b/g).toString()).toEqual('12,12');
				});

			});
		});
	});

	describe("String Object내의 정규식 메소드 활용", function() {

		describe("Search 메소드", function() {
			it("'12_34'.search(/12|34/) 이 평가되면 0이 반환된다. ", function(){
				expect('12_34'.search(/12|34/)).toEqual(0);
			});

			it("'12_34'.search(/12|34/g) 가 평가되면 0이 반환된다. ", function(){
				expect('12_34'.search(/12|34/g)).toEqual(0);
			});

			it("'00_12_34'.search(/34|12/) 이 평가되면 3이 반환된다. ", function(){
				expect('00_12_34'.search(/34|12/)).toEqual(3);
			});
		});

		describe("split 메소드=>", function() {
			it("'12_34_56'.split('_').toString() 이 평가되면 12,34,56이 반환된다. ", function(){
				expect('12_34_56'.split('_').toString()).toEqual('12,34,56');
			});

			it("'12_34_56'.split('_').toString() 이 평가되면 12,34,56이 반환된다. ", function(){
				expect('12_34_56'.split('_').toString()).toEqual('12,34,56');
			});

			describe("매치가 없으면 본디 문자열을 []로 반환함=>", function() {
				it("'12_34_56'.split('S').toString() 이 평가되면 12_34_56이 반환된다. ", function(){
					expect('12_34_56'.split('S').toString()).toEqual('12_34_56');
				});
			});

			describe("()안에 구분자를 넣으면 구분자를 반환한다.=>", function() {
				it("'12A34A56'.split(/(A)/).toString() 이 평가되면 12,A,34,A,56이 반환된다. ", function(){
					expect('12A34A56'.split(/(A)/).toString()).toEqual('12,A,34,A,56');
				});
			});

			describe("두번째 인수로 숫자를 넣으면 반환된 배열의 갯수를 제한한다=>", function() {
				it("'12_34_56'.split('_',2).toString() 이 평가되면 56이 반환된다. ", function(){
					expect('12_34_56'.split('_',2).toString()).toEqual('12,34');
				});
			});
		});

		describe("exec 메소드=>", function() {
			it("/s/g.exec('sports') 이 평가되어도 1개만 매치된다. ", function(){
				expect(/s/g.exec('sports').length).toEqual(1);
			});
		});

	});

});

describe("수량자 학습", function() {
	describe("욕심많은 매치", function() {
		describe("가능한 최대로 매치", function() {
			it("'AAAC AAC'.match(/A+/).toString()이 평가되면 'AAA'가 반환된다. ", function(){
				expect('AAAC AAC'.match(/A+/).toString()).toEqual('AAA');
			});

			it("'AAAC AAC'.match(/A+/g).toString()이 평가되면 'AAA,AA'가 반환된다. ", function(){
				expect('AAAC AAC'.match(/A+/g).toString()).toEqual('AAA,AA');
			});
		});

		describe("====> 모든 문자를 매치하려면? <====", function() {
			it("'AAAC AAC'.match(/.+/).toString()이 평가되면 'AAAC AAC'가 반환된다. ", function(){
				expect('AAAC AAC'.match(/.+/).toString()).toEqual('AAAC AAC');
			});
		});

		describe("연습문제 : check함수 작성", function() {
			//1.모두 숫자라면 true를 리턴
			//2.하나라도 숫자가 아니면 false를 리턴
			//3.값의 자릿수는 유동적이다.
			var check = function(val){
				return /^\d+$/.test(val);
			};

			it('check("1234")는 true를 리턴한다', function(){
				expect(check("1234")).toEqual(true);
			});

			it('check("1234AA")는 false를 리턴한다', function(){
				expect(check("1234AA")).toEqual(false);
			});

			it('check("AA1234")는 false를 리턴한다', function(){
				expect(check("AA1234")).toEqual(false);
			});

			it('check("")는 false를 리턴한다', function(){
				expect(check("")).toEqual(false);
			});
		});
	});

	describe("욕심많은 매치: * => ", function() {
		//욕심많은 매치 사용전 => 전체분석
		//무조건 왼쪽에서 오른쪽으로 매치하지 말고
		//매치 대상과 패턴 전체를 분석한 후에 매치할 것

		it('AB로 중단되는 문자열을 매치하라', function(){
			expect('abcAB'.match(/.+AB/).toString()).toEqual('abcAB');
		});


		it('12C와 일치하던 일치하지 않던 매치하라', function(){
			expect('12A'.match(/12C*/).toString()).toEqual('12');
		});

		describe("연습문제 => ", function() {
			it("AAAC'.match(/A*/).toString() 이 평가되면 AAA가 리턴된다", function(){
				expect('AAAC'.match(/A*/).toString()).toEqual('AAA');
			});

			it("'AABAAAC'.match(/A*/).toString() 이 평가되면 AA가 리턴된다", function(){
				expect('AABAAAC'.match(/A*/).toString()).toEqual('AA');
			});

			it("'12AB_12EFG'.match(/12C*/g).toString() 이 평가되면 12,12가 리턴된다", function(){
				expect('12AB_12EFG'.match(/12C*/g).toString()).toEqual('12,12');
			});
		});
	});

	describe("욕심많은 매치: ? => ", function() {
		describe("없어도 좋지만 하나만 매치 ", function() {

			it("'123AAA'.match(/123S?/).toString() 이 평가되면 123가 리턴된다", function(){
				expect('123AAA'.match(/123S?/).toString()).toEqual('123');
			});

			it("'123SSSK'.match(/123S?K/).toString() 이 평가되면 null이 리턴된다", function(){
				expect('123SSSK'.match(/123S?K/)).toEqual(null);
			});

			it("'123SSSK'.match(/123S*K/).toString() 이 평가되면 123S이 리턴된다", function(){
				expect('123SSSK'.match(/123S*K/).toString()).toEqual('123SSSK');
			});
		});
	});

	describe("* 이나 ?이 등장하면 * 이나 ? 을 기준으로 뒤에서부터 매치한다고 생각하고 정규식을 작성할것(실 구현은 약간 다르지만)  => ", function(){
		it("'123ABCD'.match(/.?AB/).toString() 이 평가되면 3AB가 리턴된다", function(){
			expect('123ABCD'.match(/.?AB/).toString()).toEqual('3AB');
		});
	});

	describe("매치범위 지정", function() {
		describe("{<숫자>} => 안에 들어온 숫자만큼 매치", function() {
			it("'AAA'.match(/A{2}/).toString() 이 평가되면 AA가 리턴된다", function(){
				expect('AAA'.match(/A{2}/).toString()).toEqual('AA');
			});

			it("'AAA'.match(/A{4}/) 이 평가되면 null이 리턴된다", function(){
				expect('AAA'.match(/A{4}/)).toEqual(null);
			});

			it("'AAAKK'.match(/A{2}K/).toString() 이 평가되면 'AAK'가 리턴된다", function(){
				expect('AAAKK'.match(/A{2}K/).toString()).toEqual('AAK');
			});
		});

		describe("{<숫자>,} => 안에 들어온 숫자보다 많은 갯수를 매치", function() {
			it("'AAAA'.match(/A{2,}/).toString() 이 평가되면 'AAAA'가 리턴된다", function(){
				expect('AAAA'.match(/A{2,}/).toString()).toEqual('AAAA');
			});

			it("'AAAA'.match(/A{5,}/) 가 평가되면 null이 리턴된다", function(){
				expect('AAAA'.match(/A{5,}/)).toEqual(null);
			});
		});

		describe("{<숫자>,<숫자>} => 안에 들어온 범위 안에 수렴되는만큼 매치", function() {
			it("'AAAAA'.match(/A{2,4}/).toString() 이 평가되면 'AAAA'가 리턴된다", function(){
				expect('AAAAA'.match(/A{2,4}/).toString()).toEqual('AAAA');
			});

			it("'AAA'.match(/A{2,4}/).toString() 이 평가되면 'AAA'가 리턴된다", function(){
				expect('AAA'.match(/A{2,4}/).toString()).toEqual('AAA');
			});

			describe("최소 매치 갯수가 0일 때에는 무조건 매치 성공!!", function() {
				it("'CCC'.match(/A{0,2}/) 이 평가되면 ''이 리턴된다", function(){
					expect('CCC'.match(/A{0,2}/).toString()).toEqual('');
				});
			});
		});
	});

	describe("욕심없는 매치 =>", function() {
		describe(" +? => 왼쪽에서 오른쪽으로 최대한 적게 한번만 매치", function() {
			it("'AAAAAC'.match(/AA+?/).toString() 이 평가되면 'AA'가 리턴된다", function(){
				expect('AAAAAC'.match(/AA+?/).toString()).toEqual('AA');
			});

			it("'AAAAAC'.match(/AA+/).toString() 이 평가되면 'AAAAA'가 리턴된다", function(){
				expect('AAAAAC'.match(/AA+/).toString()).toEqual('AAAAA');
			});
		});

		describe(" *? => 왼쪽에서 오른쪽으로 최대한 적게 매치 => ", function() {
			describe("*? 왼쪽에 매치되는 문자가 있더라도 1개는 무시한다 => ", function() {

				it("'ABCABC'.match(/ABC*?/).toString() 이 평가되면 'AB'가 리턴된다", function(){
					expect('ABCABC'.match(/ABC*?/).toString()).toEqual('AB');
				});

				it("'ABCABC'.match(/ABZ*?/).toString() 이 평가되면 'AB'가 리턴된다", function(){
					expect('ABCABC'.match(/ABZ*?/).toString()).toEqual('AB');
				});

				it("'AAAAA'.match(/A*?/).toString() 이 평가되면 ''가 리턴된다", function(){
					expect('AAAAA'.match(/A*?/).toString()).toEqual('');
				});

				it("[중요]'AAAKK'.match(/A*?K/).toString() 이 평가되면 'AAAK'가 리턴된다", function(){
					//1. A와 K가 일치하는가? => false
					//2. AA와 K가 일치하는가? => false
					//2. AAA와 K가 일치하는가? => true
					expect('AAAKK'.match(/A*?K/).toString()).toEqual('AAAK');
				});

			});
		});

		describe(" {<숫자>,<숫자>}? => 숫자범위 무시 => ", function() {
			it("'AAAAA'.match(/A{1,}/).toString() 이 평가되면 'AAAAA'가 리턴된다", function(){
				expect('AAAAA'.match(/A{1,}/).toString()).toEqual('AAAAA');
			});

			it("'AAAAA'.match(/A{1,}?/).toString() 이 평가되면 최소 1개인 'A'가 리턴된다", function(){
				expect('AAAAA'.match(/A{1,}?/).toString()).toEqual('A');
			});

			it("'AAAAA'.match(/A{1,5}?/).toString() 이 평가되면 최소 1개인 'A'가 리턴된다", function(){
				expect('AAAAA'.match(/A{1,5}?/).toString()).toEqual('A');
			});
		});
	});
});

describe('문자집합 학습', function(){

	it("'ABCDE'.match(/[ABK]/).toString()이 평가되면 'A'가 반환된다. ", function(){
		expect('ABCDE'.match(/[ABK]/).toString()).toEqual('A');
	});

	it("'ABCDE'.match(/[]/)이 평가되면 null이 반환된다. ", function(){
		expect('ABCDE'.match(/[]/)).toEqual(null);
	});

	it("'ABCDE'.match(/[BAC]/).toString()이 평가되면 'A'가 반환된다. ", function(){
		expect('ABCDE'.match(/[BAC]/).toString()).toEqual('A');
	});

	it("'정규표현식'.match(/[표정]/g).toString()이 평가되면 '정,표'가 반환된다. ", function(){
		expect('정규표현식'.match(/[표정]/g).toString()).toEqual('정,표');
	});

	describe('[]안의 값들은 문자가 된다.예를 들어 [1+]는 1이후의 모든글자가 아니라 1 혹은 + 라는 뜻', function(){

		it("'111'.match(/[1+]/).toString()이 평가되면 '1'가 반환된다. ", function(){
			expect('111'.match(/[1+]/).toString()).toEqual('1');
		});

		it("'?12'.match(/[.?1]/).toString()이 평가되면 '?'가 반환된다. ", function(){
			expect('?12'.match(/[.?1]/).toString()).toEqual('?');
		});
	});

	describe('\\b : 백스페이스', function(){
		it('유니코드 문자 \\u0008 는 \\b에 매치된다.', function(){
			expect('\u0008'.match(/[\b]/).toString()).toEqual('\u0008');
		});
	});

	describe('[<최소수>-<최대수>] : 최소~최대 구간 사이에 속한 값을 매치한다. 최소,최대 구간이 바뀌면 에러 발생', function(){

		describe('[]는 1개 문자이기 때문에 결과 또한 문자 1개, 매치된 결과 중에서 가장 앞의 문자가 리턴된다.', function(){
			it("'54321'.match(/[0-5]/).toString()이 평가되면 '54321'가 반환된다. ", function(){
				expect('54321'.match(/[0-5]/).toString()).toEqual('5');
			});
		});

		it("'CDBD'.match(/[A-E]/g).toString()이 평가되면 'C,D,B,D'가 반환된다. ", function(){
			expect('CDBD'.match(/[A-E]/g).toString()).toEqual('C,D,B,D');
		});

		describe('[-<최대수>]는 ~최대수 라는 범위를 의미하는 것이 아니라, -문자 1개 최대수 문자 1개. 각각 별개 문자로 인식한다.', function(){
			it("'73-21'.match(/[-3]/).toString()이 평가되면 '3'가 반환된다. ", function(){
				expect('73-21'.match(/[-3]/).toString()).toEqual('3');
			});

			it("'721'.match(/[-3]/)이 평가되면 null 반환된다. ", function(){
				expect('721'.match(/[-3]/)).toEqual(null);
			});

			it("'7321'.match(/[3-]/).toString()이 평가되면 '3'가 반환된다. ", function(){
				expect('7321'.match(/[3-]/).toString()).toEqual('3');
			});
		});
	});

	describe('연습문제 : 값 전체가 영문 대소문자이면 true를, 아니면 false를 리턴하는 check함수를 작성하라 => ', function(){
		var check = function(value){
			//A-Z가 하나의 토큰. a-z가 하나의 토큰
			return /^[A-Za-z]+$/.test(value);
		};

		it("check('ABCD') 의 평가 결과는 true이다", function(){
			expect(check('ABCD')).toEqual(true);
		});

		it("check('abcd') 의 평가 결과는 true이다", function(){
			expect(check('abcd')).toEqual(true);
		});

		it("check('ABcd') 의 평가 결과는 true이다", function(){
			expect(check('ABcd')).toEqual(true);
		});

		it("check('123') 의 평가 결과는 false이다", function(){
			expect(check('123')).toEqual(false);
		});

		it("check('12AB') 의 평가 결과는 false이다", function(){
			expect(check('12AB')).toEqual(false);
		});

		it("check('AB12') 의 평가 결과는 false이다", function(){
			expect(check('AB12')).toEqual(false);
		});

	});

	describe('연습문제 : 값 전체가 영문 대소문자,숫자이면 true를, 아니면 false를 리턴하는 check함수를 작성하라 => ', function(){
		var check = function(value){
			//A-Z가 하나의 토큰. 0-9가 하나의 토큰, a-z가 하나의 토큰
			return /^[A-Z0-9a-z]+$/.test(value);
		};

		it("check('AB12') 의 평가 결과는 true이다", function(){
			expect(check('AB12')).toEqual(true);
		});
	});

	describe('[^] : 제외 => []안에 작성하지 않은 문자에 매치한다.', function(){

		it("'ABCD'.match(/[^A]/).toString()이 평가되면 B가 리턴된다", function () {
			expect('ABCD'.match(/[^A]/).toString()).toEqual('B');
		});

		describe('범위를 나타내는 하이픈이 들어가면 or조건이 된다', function() {

			it("'15257'.match(/[^1-4]/g).toString()이 평가되면 5,5,7가 리턴된다", function () {
				expect('15257'.match(/[^1-4]/g).toString()).toEqual('5,5,7');
			});
		});

		describe('범위를 나타내는 하이픈이 들어가지 않으면 and조건이 된다.', function(){

			it("'ABCDE'.match(/[^ABD]/).toString()이 평가되면 C가 리턴된다", function(){
				expect('ABCDE'.match(/[^ABD]/).toString()).toEqual('C');
			});

			it("'정규표현식'.match(/[^정표]/g).toString()이 평가되면 규,현,식가 리턴된다", function(){
				expect('정규표현식'.match(/[^정표]/g).toString()).toEqual('규,현,식');
			});
		});

	});

	describe('연습문제 : 값 전체가 영문 대소문자이며 @,%,-가 들어갔을 경우 true를, 아니면 false를 리턴하는 check함수를 작성하라 => ', function(){
		var check = function(value){
			//A-Z가 하나의 문자. a-z가 하나의 문자. @,%,-가 하나의 문자
			//A-Za-z@rk
			return /^[A-Za-z@%-]+$/.test(value);
		};

		it("check('ABCD@%-') 의 평가 결과는 true이다", function(){
			expect(check('ABCD@%-')).toEqual(true);
		});

		it("check('abcd@') 의 평가 결과는 true이다", function(){
			expect(check('abcd@')).toEqual(true);
		});

		it("check('ABcd@') 의 평가 결과는 true이다", function(){
			expect(check('ABcd@')).toEqual(true);
		});

		it("check('123@') 의 평가 결과는 false이다", function(){
			expect(check('123@')).toEqual(false);
		});

		it("check('12@AB') 의 평가 결과는 false이다", function(){
			expect(check('12@AB')).toEqual(false);
		});

		it("check('A@B12') 의 평가 결과는 false이다", function(){
			expect(check('A@B12')).toEqual(false);
		});

	});

	describe('연습문제 : 0~9,-의 입력만 허용하는 함수를 작성하라  => ', function() {
		var accValid = function (value) {
			//[0-9-]는 문자집합, 0-9는 문자, -는 문자
			return /^[0-9-]+$/.test(value);
		};

		it("accValid('123@') 의 평가 결과는 false이다", function(){
			expect(accValid('123@')).toEqual(false);
		});

		it("accValid('12-') 의 평가 결과는 true이다", function(){
			expect(accValid('12-')).toEqual(true);
		});

		it("accValid('12345-67890') 의 평가 결과는 true이다", function(){
			expect(accValid('12345-67890')).toEqual(true);
		});
	});

	describe('-만 배제하는 함수를 작성하라  => ', function() {
		var removeHypne = function (value) {
			return value.replace(/-/g,'');
		};

		it("removeHypne('123-------------123123-----').toString() 의 평가 결과는 '123123123'이다", function(){
			expect(removeHypne('123-------------123123-----').toString()).toEqual('123123123');
		});

		it("removeHypne('12-') 의 평가 결과는 true이다", function(){
			expect(removeHypne('12-').toString()).toEqual('12');
		});

		it("removeHypne('12345-67890').toString() 의 평가 결과는 true이다", function(){
			expect(removeHypne('12345-67890').toString()).toEqual('1234567890');
		});
	});

	describe('문자열 전체가 a인지 확인하는 함수를 작성하라  => ', function() {
		var itsAllA = function (value) {
			return /^[a]+$/.test(value);
		};

		it("itsAllA('12-') 의 평가 결과는 false이다", function(){
			expect(itsAllA('12-')).toEqual(false);
		});

		it("itsAllA('aaaaaaaaaaa') 의 평가 결과는 true이다", function(){
			expect(itsAllA('aaaaaaaaaaa')).toEqual(true);
		});
	});
});

describe('정규식 실전학습', function(){
	describe('HTML 마크업 속에서 innerText만 추출하는 함수를 작성하라', function(){
		var getText = function(value){
			return value.replace(/<\/?[^>]+>/ig,'');
		};

		it("<script src='spec/regexSpec.js'>sss</script> 의 평가 결과는 sss이다", function(){
			expect(getText("<script src='spec/regexSpec.js'>sss</script>")).toEqual('sss');
		});

	});
});

describe('이스케이프 클래스', function(){
	describe(' \\ => 패턴문자의 문자화', function(){

		it("'^ABC'.match(/^A/)이 평가되면 null이 반환된다. -> 첫 문자가 ^이므로 매치 실패",function(){
			expect('^ABC'.match(/^A/)).toEqual(null);
		});

		it("'B^AC'.match(/\^A/)이 평가되면 null이 반환된다. -> ^A가 문자열이 되므로 ^A가 매치",function(){
			expect('B^AC'.match(/\^A/).toString()).toEqual('^A');
		});


		it("'\\AB'.match(/\\A/)이 평가되면  ->\\A를 문자로 인식하므로 \\A가 리턴",function(){
			expect('\\AB'.match(/\\A/).toString()).toEqual('\\A');
		});

	});

	describe('\\d => 숫자만 매치', function(){
		it("'A123'.match(/\d/)이 평가되면 1이 반환된다. -> 문자 1개만 매치되기 때문",function(){
			expect('A123'.match(/\d/).toString()).toEqual('1');
		});

		it("'A123'.match(/\d+$/g)이 평가되면 123이 반환된다. -> +가 일종의 커서 역활을 해서 연속 매치를 실시하기 때문",function(){
			expect('A123'.match(/\d+$/g).toString()).toEqual('123');
		});
	});

	describe('\\S => 보이는 문자만 매치', function(){

		it("'\u0009\u0061'.match(/\S/)이 평가되면 a이 반환된다. -> 보이는 문자 1개만 매치되기 때문",function(){
			expect('\u0009\u0061'.match(/\S/).toString()).toEqual('a');
		});
	});

	describe('\\w => 63개 문자만 매치', function(){

		it("'%_aA1'.match(/\w/g)이 평가되면 _,a,A,1이 반환된다.",function(){
			expect('%_aA1'.match(/\w/g).toString()).toEqual('_,a,A,1');
		});
	});

	describe('\\W => 63개 이외의 문자만 매치', function(){

		it("'%_aA1'.match(/\W/g)이 평가되면 %이 반환된다.",function(){
			expect('%_aA1'.match(/\W/g).toString()).toEqual('%');
		});
	});

});


describe('그룹화 ==> ', function(){

	describe('() ==> 캡쳐하고, 그 값을 () 밖의 패턴에 매치한다. 결과적으로 2번 평가되는 것', function(){

		it("'abc'.match(/(a)/).toString()이 평가되면 'a,a'가 된다.",function(){
			expect('abc'.match(/(a)/).toString()).toEqual('a,a');
		});

		it("'abc'.match(/((a))/).toString()이 평가되면 'a,a,a'가 된다.",function(){
			expect('abc'.match(/((a))/).toString()).toEqual('a,a,a');
		});

		it("'ABCDEF'.match(/AB(C|P)(D|Q)EF/).toString()이 평가되면 'ABCDEF,C,D'가 된다.",function(){
			//1. C매치됨 -> 2번째 인덱스로 이동
			//2. D매치됨 -> 3번째 인덱스로 이동
			//3. ABCDEF 풀매치됨 -> 1번째 인덱스로 이동
			expect('ABCDEF'.match(/AB(C|P)(D|Q)EF/).toString()).toEqual('ABCDEF,C,D');
		});
	});

	describe('undefined 설정 메커니즘', function() {
		it("<이게 제일 어려운듯> 'baseball'.match(/((ball)|(base))/).toString()이 평가되면 'base,base,undefined,base'가 된다.",function(){

			//배열 위치
			//1. ((base)|(ball))
			//2. (ball | (base))
			//3. (ball | base)
			//4. (base) => base

			//연산 순서
			//1. (ball) => base
			//2. (base | (base)) => base
			//3. (base)
			expect('baseball'.match(/((ball)|(base))/).toString()).toEqual('base,base,,base');
		});
	});


	describe('template함수 유사 구현', function() {

		var template = function(html,value){
			var templateExp = /\{(\w+)?\}/g;
			return html.replace(templateExp,value);
		};

		it("<div>{aaa}</div> 를 template 함수로 렌더링하면 <div>hello</div>가 된다.",function(){
			var html = "<div>{aaa}</div>";
			expect(template(html,"hello")).toEqual('<div>hello</div>');
		});
	});

	describe('캡쳐 값 참조', function() {

		it("'ABCDEF_CD'.match(/AB(C|K)(D|X)EF_/)가 평가되면 ABCDEF_,C,D 가 리턴된다",function(){
			expect('ABCDEF_CD'.match(/AB(C|K)(D|X)EF_/).toString()).toEqual('ABCDEF_,C,D');
		});

		it("'ABCDEF_CD'.match(/AB(C|K)(D|X)EF_\1\2/)가 평가되면 ABCDEF_CD,AC,D 가 리턴된다",function(){
			//1. \1 => 첫번째 캡쳐한 값으로 패턴을 replace하겠다.
			//2. \2 => 두번째 캡쳐한 값으로 패턴을 replace하겠다.
			expect('ABCDEF_CD'.match(/AB(C|K)(D|X)EF_\1\2/).toString()).toEqual('ABCDEF_CD,C,D');
		});

		it("'ABCDEF_CD'.match(/AB(C|K)(D|X)EF_\1\2/)가 평가되면 RegExp.$1에 C가 할당된다.",function(){
			//1. \1 => 첫번째 캡쳐한 값으로 패턴을 replace하겠다.
			//2. \2 => 두번째 캡쳐한 값으로 패턴을 replace하겠다.
			'ABCDEF_CD'.match(/AB(C|K)(D|X)EF_\1\2/).toString();

			expect(RegExp.$1).toEqual('C');
		});

		describe('연습문제 => ', function() {
			describe('숫자 값 세자리마다 콤마를 삽입하는 insertComma함수를 작성하라', function() {
				var pattern = /(^[+-]?\d+)(\d{3})/;
				var insertComma = function(value){
					var str = value.toString();
					while(pattern.test(str)){
						//RegExp클래스의 스태틱 프로퍼티로부터 얻어내는 방법도 있다.
						str = str.replace(pattern, RegExp.$1 + ',' + RegExp.$2);
					}
					return str;
				};

				it('insertComma(123456)가 평가되면 123,456 이 된다', function(){
					expect(insertComma('123456')).toEqual('123,456');
				});
			});

			describe('4자 앞에 ##을 삽입하는 함수를 작성하라', function() {
				var insertSpSp = function(value){
					var pattern = /(^\w+)(\w{4})/;
					var str = value.toString();
					while(pattern.test(str)){
						//replace함수 내부에서 이렇게 참조하는것 또한 가능.
						str = str.replace(pattern, '$1' + '##' + '$2');
					}
					return str;
				};

				it("insertSpSp(123456123456123456)가 평가되면 '12##3456##1234##5612##3456' 이 된다", function(){
					expect(insertSpSp('123456123456123456')).toEqual('12##3456##1234##5612##3456');
				});
			});
		});
	});
});