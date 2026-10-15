import importlib.util
import json
import os
import pathlib
import shutil
import subprocess
import tempfile
import unittest

ROOT=pathlib.Path(__file__).resolve().parent
spec=importlib.util.spec_from_file_location('validator',ROOT/'validate.py')
v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)

class CandidateTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.root=pathlib.Path(self.tmp.name)/'candidate'
        shutil.copytree(ROOT,self.root,ignore=shutil.ignore_patterns('dist','__pycache__'))
        self.env=dict(os.environ,CANDIDATE_SOURCE=str(pathlib.Path(os.environ.get('CANDIDATE_SOURCE',ROOT/'../drbrainnet/lib')).resolve()))
    def tearDown(self): self.tmp.cleanup()
    def build(self,config=None):
        if config: (self.root/'config.json').write_text(json.dumps(config))
        return subprocess.run(['node',str(self.root/'build.mjs')],env=self.env,capture_output=True,text=True)
    def test_review(self):
        self.assertEqual(self.build().returncode,0)
        self.assertEqual(v.validate(self.root)['faq_answers'],16)
    def test_unapproved_release_rejected(self):
        c=json.loads((self.root/'config.json').read_text());c.update(mode='release',origin='https://example.com')
        self.assertNotEqual(self.build(c).returncode,0)
    def test_approved_release_configuration(self):
        c=json.loads((self.root/'config.json').read_text());c.update(mode='release',origin='https://example.com',approvedOrigin='https://example.com',medicalContentApproved=True,companyContentApproved=True)
        self.assertEqual(self.build(c).returncode,0)
        self.assertEqual(v.validate(self.root)['mode'],'release')
    def test_origin_mismatch_rejected(self):
        c=json.loads((self.root/'config.json').read_text());c.update(mode='release',origin='https://example.com',approvedOrigin='https://other.example.com',medicalContentApproved=True,companyContentApproved=True)
        self.assertNotEqual(self.build(c).returncode,0)
    def test_pdf_injection_rejected(self):
        self.assertEqual(self.build().returncode,0)
        (self.root/'dist/leak.pdf').write_text('fixture')
        with self.assertRaises(AssertionError): v.validate(self.root)
    def test_faq_mismatch_rejected(self):
        self.assertEqual(self.build().returncode,0)
        p=self.root/'dist/products/realnow/index.html';s=p.read_text();s=s.replace('<h3>What does RealNow™ analyze?</h3>','<h3>Changed question</h3>');p.write_text(s)
        with self.assertRaises(AssertionError): v.validate(self.root)
    def test_private_origin_rejected_for_release(self):
        c=json.loads((self.root/'config.json').read_text());c.update(mode='release',origin='https://preview.chatgpt.site',approvedOrigin='https://preview.chatgpt.site',medicalContentApproved=True,companyContentApproved=True)
        self.assertNotEqual(self.build(c).returncode,0)

if __name__=='__main__': unittest.main(verbosity=2)
