export default function mergeSamples (samplesA = [], samplesB = []) {
	if (!samplesA.length) return samplesB.concat();
	if (!samplesB.length) return samplesA.concat();

	let firstSamplesB = samplesB[0] || {};
	let samplesAOffsetIndex = samplesA.findIndex(sample => firstSamplesB.bucket === sample.bucket);

	if (samplesAOffsetIndex >= 0) {
		let leadingSamples = samplesA.slice(0, samplesAOffsetIndex);
		let mergedSamples = samplesB.map(function (sampleB, index) {
			let sampleA = samplesA[samplesAOffsetIndex + index];

			return Object.assign({}, sampleB, sampleA);
		});
		let trailingSamles = samplesA.slice(samplesB.length);

		return leadingSamples.concat(mergedSamples).concat(trailingSamles);
	}

	let firstSamplesA = samplesA[0] || {};
	let samplesBOffsetIndex = samplesB.findIndex(sample => firstSamplesA.bucket === sample.bucket);

	let leadingSamples = samplesB.slice(0, samplesBOffsetIndex);
	let mergedSamples = samplesA.map(function (sampleA, index) {
		let sampleB = samplesB[samplesBOffsetIndex + index];

		return Object.assign({}, sampleA, sampleB);
	});
	let trailingSamles = samplesB.slice(samplesA.length);

	return leadingSamples.concat(mergedSamples).concat(trailingSamles);
}