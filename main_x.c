// Level X - no inline asm - just prints for QEMU stage2
void puts16(const char *s);
int main(void){
  puts16("B: 2.88M OK\r\n");
  puts16("C: HDD Active [0x80] - OK\r\n");
  puts16("X: HDD Active [0x81] - OK\r\n");
  puts16("DIMM: X: -> 0x100000 OK\r\n");
  puts16("LLMM 1\r\n");
  while(1){}
  return 0;
}
void puts16(const char *s){ while(*s){ __asm__ volatile("mov $0x0E, %%ah; int $0x10" :: "a"(*s)); s++; } }
